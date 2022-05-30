import React, { FC, useEffect, useState } from "react";
import MyAnimalCard, { IMyAnimalCard } from "./MyAnimalCard";
import {
  mintAnimalTokenContract,
  saleAnimalTokenAddress,
  saleAnimalTokenContract,
} from "./web3Config";

interface MyAnimalProps {
  account: string;
}
const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
  const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);
  const getAnimalTokens = async () => {
    try {
      const balanceLength = await mintAnimalTokenContract.methods
        .balanceOf(account)
        .call();

      if (balanceLength === "0") return;

      const tempAnimalCardArray = [];

      const response = await mintAnimalTokenContract.methods
        .getAnimalTokens(account)
        .call();

      response.map((v: IMyAnimalCard) => {
        tempAnimalCardArray.push({
          animalTokenId: v.animalTokenId,
          animalType: v.animalType,
          animalPrice: v.animalPrice,
        });
      });

      console.log("tempAnimalCardArray : ", tempAnimalCardArray);

      setAnimalCardArray(tempAnimalCardArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await mintAnimalTokenContract.methods
        .isApprovedForAll(account, saleAnimalTokenAddress)
        .call();

      if (response) {
        setSaleStatus(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
        .send({ from: account });

      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) return;
    getAnimalTokens();
    getIsApprovedForAll();
  }, [account]);

  return (
    <>
      <div>
        <div style={{textAlign:'center',float:'left',width:'50%',height:'48px',fontSize:'30px',color:'#ffffff',backgroundColor:'violet',border:'2px solid gray'}}>
        <span>Sale Status : {saleStatus ? "True" : "False"}</span>
        </div>
        <button
        onClick={onClickApproveToggle}
        background-color={saleStatus ? "red" : "blue"}
        style={{width:'50%',height:'48px',fontSize:'30px',color:'#ffffff',backgroundColor:'violet',border:'2px solid gray'}}
      >
        {saleStatus ? "Cancel" : "Approve"}
      </button>
      </div>
      

      <div style={{}}>
        <div style={{position:'absolute'}}>
        <img src="../../static/market.jpg" style={{position:'relative',width:'100%',height:'6000px',zIndex:"0"}}></img>
        </div>
        <div style={{zIndex:'3',position:'relative',paddingTop:'20px'}}>
        {animalCardArray &&
          animalCardArray.map((v, i) => {
            return (
              <MyAnimalCard
                key={i}
                animalTokenId={v.animalTokenId}
                animalType={v.animalType}
                animalPrice={v.animalPrice}
                saleStatus={saleStatus}
                account={account}
              />
            );
          })}
          </div>
      </div>
    </>
  );
};

export default MyAnimal;
