var denom = [
  { name: "ONE HUNDRED", val: 100.0 },
  { name: "TWENTY", val: 20.0 },
  { name: "TEN", val: 10.0 },
  { name: "FIVE", val: 5.0 },
  { name: "ONE", val: 1.0 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 }
];

function checkCashRegister(price, cash, cid) {
  var output = { status: null, change: [] };
  var change = cash - price;
  var register = cid.reduce(
    function(acc, curr) {
      acc.total += curr[1];
      acc[curr[0]] = curr[1];
      
      return acc;
    },
    { total: 0 }
  );
  console.log(register)
  if (register.total === change) {
    output.status = "CLOSED";
    output.change = cid;
    return output;
  }
  if (register.total < change) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }
  var change_arr = denom.reduce(function(acc, curr) {
    var value = 0;
    console.log("before while" + " " +register[curr.name],change,curr.val)
    while (register[curr.name] > 0 && change >= curr.val) {
      console.log("initial change "+change, curr.val)
      change -= curr.val;
      register[curr.name] -= curr.val;
      value += curr.val;
      change = Math.round(change * 100) / 100;
      console.log("after change "+change,curr.val)
    }
    console.log(register[curr.name])
    if (value > 0) {
      acc.push([curr.name, value]);
    }
     
    return acc; 
  }, []); 
  if (change_arr.length < 1 || change > 0) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }
  output.status = "OPEN";
  output.change = change_arr;
  return output;
}

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
