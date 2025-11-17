import { useState, useEffect, type ReactNode } from "react";
import LRCFILE from "./assets/LRCFILESWEATERWEATHER.txt" 
import axios from "axios";

const InformationForApisAllItems = {Data:{}}; 

type StartPageProposition = {
  Onstart: () => void;
};


// example on apis

export type DataFromApi = {
Items: {
payload: {
  items: [item];
    }
  }
}
export type item = {
  "id": string,
  "thumb": string,
  "url_name": string,
  "item_name": string,
}
export function WarframeMarketGetKey() {

useEffect(
  () => {
const fetchingData = async () => {
  const response = await axios.post("http://localhost:8080/myapi/GetLoginToken", {
  "auth_type": "header",
  "email": "nathanbawanideen0106@gmail.com",
  "password": "B&Srm4xRA7@h_DD",
  "device_id": "string"
})
const CompiledData = response.data;
console.dir(CompiledData.data, "From Client");
return CompiledData;
}
fetchingData();
  }, []
)

}

export function WarFrameMarketApiOrder(itemId:string, order_type:string, platinum:number,quantity:number,rank:number,subtype:string) {
  const Fetching = async () => {
  console.log("hi!!");
  const response = await axios.post("http://localhost:8080/myapi/CreateOrders", 
  {
  "item": itemId,
  "order_type": order_type,
  "platinum": platinum,
  "quantity": quantity,
  "visible": true,
  "rank": rank,
  "subtype": subtype,
}, {headers:{ "Content-Type": "application/json","auth_type": "header",}}
);
  const CompiledData = response.data;
  console.log(response.data);
  return CompiledData;
} 
async function load() {
        const result = await Fetching();
        return result
      }; 
load();

}

export function WarFrameMarketApi() {
WarframeMarketGetKey()
const [Platinum, ChangePlatinum] = useState<number>(0);
const [ItemName, ChangeItemName] = useState<string>("");
const [ItemId, ChangeItemId] = useState<string>("");
const [Quantity, ChangeQuantity] = useState<number>(0);
const [Rank, ChangeRank] = useState<number>(0);
const [Subtype, ChangeSubType] = useState<string>("");
const [Data, SettingData] = useState<DataFromApi>();

const Buy = () => WarFrameMarketApiOrder(ItemId, "buy", Platinum, Quantity,Rank,Subtype);
const Sell = () => WarFrameMarketApiOrder(ItemId, "sell", Platinum, Quantity,Rank,Subtype);
  //data = value, settingdata = func to update that value, initstate = init

  const Fetching = async () => {
  const response = await axios.get("http://localhost:8080/myapi/wfmsellables", 
    {headers:{
  "Content-Type": "application/json",}});
  const CompiledData:DataFromApi = response.data;
  console.log(CompiledData.Items.payload.items[0].id)
  InformationForApisAllItems.Data = CompiledData.Items.payload.items;
  return CompiledData;
} 
function SetUpStuff():ReactNode {
if (!Data) return
return (
<div id="WarframeMarketApiDiv">
  <label className="ApiDataGrabbed">
    Select WarframeMarketItems
    <input list="optionsList" id="myInput" name="myInput" 
    onChange={(e) => {
    ChangeItemName(e.target.value);
    const selectedItem = Data.Items.payload.items.find(
      (item) => item.item_name === e.target.value
    );
    if (selectedItem) ChangeItemId(selectedItem.id);
  }}
    />
    <datalist id="optionsList">
      {Data.Items.payload.items.map((v, i) => (
        <option key={i} value={v.item_name} />
      ))}
    </datalist>
  </label>
<div id="Make Order">

  <button id="sell" onClick={Sell}>Sell</button>
  <button id="buy" onClick={Buy}>Buy</button>

  <label className="Inputs">Platinum: 
  <input id="platinum"
  value={Platinum}
  onChange={(e) => ChangePlatinum(Number(e.target.value))}
  />
  </label>

  <label className="Inputs">Quantity: 
  <input id="Quantity"
  value={Quantity}
  onChange={(e) => ChangeQuantity(Number(e.target.value))}
  />
  </label>

  <label className="Inputs">Rank: 
  <input id="rank" list="RankList"
  value={Rank}
  onChange={(e) => ChangeRank(Number(e.target.value))}
  />
      <datalist id="RankList">
        <option value = "1"/>
        <option value = "2"/>
        <option value = "3"/>
        <option value = "4"/>
        <option value = "5"/>
        <option value = "6"/>
        <option value = "7"/>
        <option value = "8"/>
        <option value = "9"/>
        <option value = "10"/>
      </datalist>
  </label>
  <label className="Inputs">Subtype:
  <input id="subtype" list="SubtypeList"
  value={Subtype}
  onChange={(e) => ChangeSubType(e.target.value)}
  />
      <datalist id="SubtypeList">
        <option value = "Intact"/>
        <option value = "Flawless"/>
        <option value = "Radiant"/>
      </datalist>
  </label>
</div>

  </div>
);

}

  useEffect(
    () => {
      async function load() {
        const result = await Fetching();
      SettingData(result);
      };
      
load();
      return () => {
      // not necessary atm 
      };
    },
    [] // run once only);
  );

  return (
    <div>
      <h1>The Data Grabbed is as Follows:</h1>
      <pre className="ApiDataGrabbed">{/*JSON.stringify(Data, null, "  ")*/}</pre>
      <div>{SetUpStuff()}</div>
    </div>
  );
}


export function Timer({ maxTimeAllotted }: { maxTimeAllotted: number }) {
  const [time, setTime] = useState(0);
  const [visible, setVisible] = useState(true);
  <audio controls autoPlay>
    <source src="https://soundcloud.com/theneighbourhood/sweater-weather-1?utm_source=clipboard&utm_campaign=wtshare&utm_medium=widget&utm_content=https%253A%252F%252Fsoundcloud.com%252Ftheneighbourhood%252Fsweater-weather-1" type="audio/mpeg"/>
  </audio>
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev + 1 >= maxTimeAllotted) {
          clearInterval(interval);
          setVisible(false); // Hide timer when time is up
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, maxTimeAllotted]);

  if (!visible) return null; // Removes the timer from the DOM

  return <h5>{FormatTime(time)}</h5>;
}

export function FormatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const paddedSecs = secs.toString().padStart(2, "0");
  return `${mins}:${paddedSecs}`;
}

export function StartPage({ Onstart }: StartPageProposition) {
  return (
    <div>
      <h1>Welcome to the page!</h1>
      <button onClick={Onstart}>Start!</button>
    </div>
  );
}

export function StartPageTransition() {
  return (
    <div>
      <Timer maxTimeAllotted={1000} />
      <img
        id="logo"
        src="https://preview.redd.it/logo-meaning-v0-87joitmv20mc1.jpeg?auto=webp&s=1364d081e9802fbb48319817af0321a6481543d9"
      />
      <audio src="https://archive.org/embed/TheNeighbourhoodSweaterWeather"></audio>
    </div>
  );
}

export function LyricsGeneration() {

  const [CurrentLyrics, SetLyrics] = useState(String);

  useEffect(
    () => {
      fetch(LRCFILE,{method:"GET"})
      .then(TxtFromDocument => TxtFromDocument.json())
      .then(data => {console.log(data)
          SetLyrics(data)

      })
    },
[]
  )

  return (
    <div>{CurrentLyrics}</div>
  )

}

