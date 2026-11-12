import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'; // Solid Icons
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';   // Brand Icon
import "../style/indexx.css";
import {
  faArrowTrendDown,
  faArrowTrendUp,
  faBagShopping,
  faBuilding,
  faCoffee,
  faEarthAmericas,
  faEraser,
  faHandHoldingDollar,
  faHouse,
  faInr,
  faLongArrowAltRight,
  faMoneyBillTrendUp,
  faPiggyBank,
  faReceipt,
  faTrash,
  faUtensils,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { CategoryBreakup, MonthlyOverview } from "./dashboardcharts";
import { faBuildingUser } from "@fortawesome/free-solid-svg-icons/faBuildingUser";
const Main = ({ items,remove,activetab }) => {
    let totalbaldigi = 0;
    const totalincome = items.reduce((acc,curr)=>{
        return curr.Type === 'income'?acc+Number(curr.Amount||0):acc;
    },0);
    const totalexpense = items.reduce((acc,curr)=>{
        return curr.Type === 'expense'?acc+Number(curr.Amount||0):acc;
    },0);
    const totalbal =()=> {
     const totalbalance = totalincome-totalexpense;
     return totalbalance;
    }
   const savingrate = totalincome > 0
  ? ((totalincome - totalexpense) / totalincome) * 100
  : 0;
   
  return (
    <>
      <main>
        <div className="overallbalance">
          <div className="totalbalanceblock">
            <p className="balname">TOTAL BALANCE</p>
            <div className="walleticon">
              <FontAwesomeIcon icon={faWallet} style={{ color: "#eb6433" }} />
              <div>
                <FontAwesomeIcon
                  className="inricon"
                  icon={faInr}
                  style={{ color: "#eb6433" }}
                  size="xl"
                />
                <p className="totalbaldigit">{Number(totalbal()||0).toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="totalbalanceblock">
            <p className="balname">TOTAL INCOME</p>
            <div className="upicon">
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                style={{ color: "rgb(0,212,170)" }}
              />
              <div>
                <FontAwesomeIcon
                  className="inricon"
                  icon={faInr}
                  style={{ color: "rgb(0,212,170)" }}
                  size="xl"
                />
                <p className="totalindigit">{totalincome.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="totalbalanceblock">
            <p className="balname">TOTAL EXPENSES</p>
            <div className="walleticon">
              <FontAwesomeIcon
                icon={faArrowTrendDown}
                style={{ color: "#eb6433" }}
              />
              <div>
                <FontAwesomeIcon
                  className="inricon"
                  icon={faInr}
                  style={{ color: "#ea0404" }}
                  size="xl"
                />
                <p className="totalexpdigit">{totalexpense.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="totalbalanceblock">
            <p className="balname">SAVINGS RATE</p>
            <div className="saveicon">
              <FontAwesomeIcon
                icon={faPiggyBank}
                style={{ color: "#ebc333dc" }}
              />
              <p className="totalsavedigit">
  {savingrate.toFixed(1)}%
</p>
            </div>
          </div>
        </div>
        <div
          className="charts"
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            maxWidth: "1200px",
          }}
        >
         <MonthlyOverview items={items} />
<CategoryBreakup items={items} />
        </div>
      </main>
      <div className="datas">
        <p className="transactiontag">Transactions</p>
        {items?.map((data, index) => (
          <div className="datadiv" key={index}>
            {data.Category==='Food & Drink'&&(
                <div className="food"><FontAwesomeIcon className="ut" icon={faUtensils}/></div>
            )}
            {data.Category==='Home Rent'&&(
                <div className="homerent"><FontAwesomeIcon className="house" icon={faHouse}/></div>
            )}
            {data.Category==='Shopping & Groceries'&&(
                <div className="shopping"><FontAwesomeIcon className="bag" icon={faBagShopping}/></div>
            )}
            {data.Category==='Bills & Recharge'&&(
                <div className="bill"><FontAwesomeIcon className="receipt" icon={faReceipt}/></div>
            )}
            {data.Category==='Travel & Hotel'&&(
                <div className="travel"><FontAwesomeIcon className="earth" icon={faEarthAmericas}/></div>
            )}
            {data.Category==='Salary & Income'&&(
                <div className="salary"><FontAwesomeIcon className="hand" icon={faHandHoldingDollar}/></div>
            )}
            {data.Category==='Freelane & Self-Employed'&&(
                <div className="freelane"><FontAwesomeIcon className="build" icon={faBuildingUser}/></div>
            )}
            {data.Category==='Investments & Trading'&&(
                <div className="invest"><FontAwesomeIcon className="money" icon={faMoneyBillTrendUp}/></div>
            )}
            {data.Category==='Buisness & Trade'&&(
                <div className="buisness"><FontAwesomeIcon className="building" icon={faBuilding}/></div>
            )}
            <div className="datadetails">
            <p className="catesign">{data.Category}</p>
            <p className="dissign">{data.Discription}</p>
            </div>
            {/* <p className="datesign">{data.Date}</p> */}
            {data.Type ==='expense'?
           ( <p className="amountexpense">-₹{data.Amount}</p>):(<p className="amountincome">+₹{data.Amount}</p>)
            }
            
            <button onClick={()=>remove(data.id)} className="removebtn">
                <FontAwesomeIcon icon={faTrash} style={{color:'white'}} className="erase"/>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default Main;
