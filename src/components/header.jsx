import { useEffect, useState } from "react";
import "../style/indexx.css";
import Main from "./Main";
const Header=()=>{
    const [addform,setaddform]=useState(false);
    const [activetab,setactivetab]=useState('expense');
    const [selectcategory,setselectcategory]=useState('');
    const [amount,setamount]=useState('');
    const [discription,setdiscription]=useState('');
    const [item,setitem]=useState(()=>{
        const savetodo = localStorage.getItem("item");
        return savetodo?JSON.parse(savetodo):[];
    })
    const removedata=(id)=>{
        setitem(item.filter(t=>t.id!=id));
    }
    const today = new Date().toISOString().split('T')[0];
    const [date,setdate]=useState(today)
    const handleform=()=>{
        const task={
            id:Date.now(),
            Amount:amount,
            Category:selectcategory,
            Type:activetab,
            Discription:discription,
            Date:date
        }
        setitem([...item,task]);

        setamount('');
        setselectcategory('');
        setdiscription('');
        setdate('');
        setaddform(false);
    }
    useEffect(()=>{
        localStorage.setItem("item",JSON.stringify(item));
    },[item])
    const categaries={
        expense:['Food & Drink','Home Rent','Shopping & Groceries','Bills & Recharge','Travel & Hotel','Other expense'],
        income:['Salary & Income','Freelane & Self-Employed','Investments & Trading','Buisness & Trade','Other']
    }
    return(
        <>
        <header>
            <div className="namelogo">
            <div className="logo">F</div>
            <p className="name">FinTrack</p>
            <p className="discription">Personal Finance Dashboard</p>
            </div>
            <button onClick={()=>setaddform(true)} className="addtrans">+ Add Transactions</button>
        </header>
        <hr className="divideheader" />
        {
            addform && 
            <div className="form-overlay">
              <div className="addform">
                <p className="formtag">New Transactions</p>
                <div className="tab-container">
                    <button className={`tab-btn expense-btn ${activetab==='expense'?'active':''}`} onClick={()=>{setactivetab('expense');setselectcategory('')}}>Expense</button>
                    <button className={`tab-btn income-btn ${activetab==='income'?'active':''}`} onClick={()=>{setactivetab('income');setselectcategory('')}}>Income</button>
                </div>
                <label htmlFor="" className="catelabel">Category</label>
                <div className="category">
                    <select name="" id="" value={selectcategory} onChange={(e)=>setselectcategory(e.target.value)}
                        className="category-select">
                        <option value="">Select Category</option>
                        {
                            categaries[activetab].map((cat,index)=>(
                                <option value={cat}>
                                    {cat}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <p className="amountlabel">Amount</p>
                <input className="amountinput" value={amount} type="number" placeholder="₹ 0"  onChange={(e)=>setamount(e.target.value)}/>
                <p className="amountlabel">Discription</p>
                <input className="amountinput" type="text" value={discription} placeholder="Wirte Transaction Discription.." onChange={(e)=>setdiscription(e.target.value)} />
                <p className="amountlabel">Date</p>
                <input className="amountinput" type="date" defaultValue={today} onChange={(e)=>setdate(e.target.value)} />
                <div className="addcancelbtn">
                    <button className="cancelbtn" onClick={()=>setaddform(false)}>Cancel</button>
                    <button className={`addbtn ${activetab==='expense'?'expense-active':'income-active'}`} onClick={handleform} >Add Transaction</button>
                </div>
              </div>
            </div>
        }
        <Main items={item} remove={removedata} activetab={activetab}/>
     
        </>
    )
}
export default Header;