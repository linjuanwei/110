'use strict';
const itemInfo=require("./items.js")();
const onSale=require("./promotions.js")();

function bestCharge(selectedItems) {
  let list=array(selectedItems);
  let str=allInfo(list);

  console.log(str);

}

function array(selectedItems) {
  let list={};
  for (let str of selectedItems){
    list[str.substring(0,8)]=parseInt(str.substring(11));
  }
 // console.log(list);
 return list;
}

function allInfo(list) {

  let type_1=[{save:0,total:0,promotions:'满30减6元'}];//{name:null,save:0,total:0,promotions:null};
  let type_2=[{w:[],save:0,total:0,promotions:'指定菜品半价'}]//{saveName:[],save:0,total:0,promotions:null};
  let type_3=[{save:0,total:0,promotions:null}];//{name:null,total:0}

  for(let good in list){
    let goodInfo={};
    let index=itemInfo.map(i=>i.id).indexOf(good);
    let type2=onSale[1].items.indexOf(good);
    goodInfo.name=itemInfo[index].name;
    goodInfo.price=itemInfo[index].price;
    goodInfo.cnt=list[good];

    goodInfo.sum=goodInfo.price*goodInfo.cnt;//计算商品总价

    type_1[0].total+=goodInfo.sum;
    type_2[0].total+=goodInfo.sum;
    type_3[0].total+=goodInfo.sum;


    if(type2!==-1) {
      let savePrice=parseInt(goodInfo.price/2*goodInfo.cnt);
      let x={//第二种优惠信息
        name:goodInfo.name,
      }
      type_2[0].w.push(x);
      type_2[0].save+=parseInt(savePrice);
    }

    type_1.push(goodInfo);
    type_2.push(goodInfo);
    type_3.push(goodInfo);
  }

  if(type_1[0].total>=30){
    type_1[0].save=type_1[0].total/30*6;
    type_1[0].total-=type_1[0].save;
  }

  type_2[0].total-=type_2[0].save;

  if(type_1[0].save>=type_2[0].save && type_1[0].save!==0 && type_2[0].save!==0){
    let str_1=str1(type_1);
    return str_1;
  }
  else   if(type_1[0].save<type_2[0].save && type_1[0].save!==0 && type_2[0].save!==0){
    let str_2=str2(type_2);
    return str_2;
  }
  else {
    let str_3=str3(type_3);
    return str_3;
  }

}

function str1(type_1) {

  let str=`============= 订餐明细 =============\n`;

  for(let i=1;i<type_1.length;i++){
    str+=`${type_1[i].name} x ${type_1[i].cnt} = ${type_1[i].sum}元\n`;

  }

  str+=`-----------------------------------
使用优惠:
${type_1[0].promotions}，省${type_1[0].save}元
-----------------------------------
总计：${type_1[0].total}元
===================================`;
return str;
}

function str2(type_2) {
  let str_2=`============= 订餐明细 =============\n`;
  for (let i=1;i<type_2.length;i++){
    str_2+=`${type_2[i].name} x ${type_2[i].cnt} = ${type_2[i].sum}元\n`;
  }
str_2+=`-----------------------------------
使用优惠:
${type_2[0].promotions}(`;
  for(let j of type_2[0].w){
    str_2+=`${j.name}，`;
}
str_2+=`)，省${type_2[0].save}元
-----------------------------------
总计：${type_2[0].total}元
===================================`;
return str_2;
}

function str3(type_3) {
  let str=`============= 订餐明细 =============\n`;

  for (let i=1;i<type_3.length;i++){
    str+=`${type_3[i].name} x ${type_3[i].cnt} = ${type_3[i].sum}元\n`;
  }
str+=`-----------------------------------
总计：${type_3[0].total}元
===================================`;

return str;
}

const r1=["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
const r2=["ITEM0013 x 4", "ITEM0022 x 1"];
const r3=["ITEM0013 x 4"];

bestCharge(r1);
bestCharge(r2);
bestCharge(r3);


module.exports =bestCharge;

