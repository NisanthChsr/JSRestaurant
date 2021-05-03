
function loadTables() {
    for (var i = 0; i < TableList.length; i++) {
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        var cost = document.createElement("p");

        div.className = "table";
        div.setAttribute("id", TableList[i].id);
        h3.textContent = TableList[i].name;

        cost.className = "table-p";
        cost.style.display = "inline";
        cost.textContent = "Rs. " + TableList[i].TotalBill + "   No. of items: " + TableList[i].noOfItems;

        div.appendChild(h3);
        div.appendChild(cost);
        div.addEventListener("drop", onDrop);
        div.addEventListener("dragover", dragOver);
        div.addEventListener("click", Button);

        document.getElementById('myTable').appendChild(div);


    }
}

loadTables();


function loadMenu() {
    for (var i = 0; i < MenuList.length; i++) {
        var div = document.createElement("div");
        div.className = "menu";

        var h3 = document.createElement("h3");
        //var cat = document.createElement("h3");
        h3.innerHTML = MenuList[i].item_name;
        div.id = MenuList[i].id;

        var costCategory = document.createElement("p");
        costCategory.innerHTML = "Rs. " + MenuList[i].cost  + " Category:" + MenuList[i].category;

        div.appendChild(h3);
        //div.appendChild(cat);
        div.appendChild(costCategory);
        
        document.getElementById('myMenu').appendChild(div);
        div.setAttribute("draggable", "true");
        div.addEventListener("dragstart", dragstart);


    }
}
loadMenu();


var price;
var iName;

function dragstart() {
    for (var i = 0; i < MenuList.length; i++) {
        if (MenuList[i].id == this.id) {
            price = MenuList[i].cost;
            iName = MenuList[i].item_name;
            break;
        }
    }
}

function onDrop() {
    this.style.backgroundColor = "orange";
    for (var i = 0; i < TableList.length; i++) {
        if (TableList[i].id == this.id) {
            TableList[i].noOfItems++;
            TableList[i].TotalBill += price;
            TableList[i].items.push(iName);

            var obj = JSON.parse(localStorage.getItem(TableList[i].name));

            for(j=0;j<obj.length;j++)
            {
                if(obj[j].item==iName)
                {
                    
                    obj[j].quantity=1;
                }
            }
            localStorage.setItem(TableList[i].name,JSON.stringify(obj));
            update();
            break;
        }
    }
}

function dragOver(ev) {
    ev.preventDefault();

}

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function Button() {
    modal.style.display = "block";
    var content = document.getElementById("Tab");
    content.textContent = "Table : " + this.id + " " + "  Billing Details";
    goForward(this.id);
}

function goForward(idOfClicked) {

    var table = document.getElementById("mTable");

    while (table.childElementCount > 1) {
        table.removeChild(table.lastChild);
        table.childElementCount--;
    }

    var i = idOfClicked - 1;

    var uniqueItems = TableList[i].items.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
    })

    if (TableList[i].id == idOfClicked) {
        for (var j = 0; j < uniqueItems.length; j++) {

            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var input = document.createElement("input");
            var td5 = document.createElement("td");
            var del = document.createElement("button");
            var item = uniqueItems[j];
            var cost = costofItem(item);

            tr.className = "trm"
            del.className = "delete";
            td1.className = "Sno";
            td1.textContent = "" + (j + 1);
            td2.textContent = item;
            td2.className = "item";
            td3.textContent = cost;
            td3.className = "price";
            del.textContent = "Delete Item";

            input.setAttribute("type", "number");
            input.setAttribute("min", 1);
            var noofserving = servings(i, item);

            //input.setAttribute("onkeypress", "return event.charCode >= 8 && event.charCode <= 57");
            

            input.addEventListener("change", function (){ serving(this, TableList[i].id, this.value); });
            input.setAttribute("value", noofserving);
            del.setAttribute("onclick", "deleteItem(this)");
            del.setAttribute("id", TableList[i].id);
            td4.appendChild(input);
            td5.appendChild(del);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            table.appendChild(tr);

            var gmodal = document.getElementById("GModal");
            var gbtn = document.getElementById("GenerateBill");

            gbtn.addEventListener("click", function () { GenerateBill(idOfClicked); });

        }
    }
    var tb = TableList[i].TotalBill;
    document.getElementById("TB").innerHTML = "Total Bill :" + tb;
}

function costofItem(item) {
    for (var i = 0; i < MenuList.length; i++) {
        if (MenuList[i].item_name == item)
            return MenuList[i].cost;
    }
}
span.onclick = function () {
    modal.style.display = "none";
}


function servings(index, item) {
    var count = 0;
    for (var i = 0; i < TableList[index].items.length; i++) {
        if (TableList[index].items[i] == item)
            count++;
    }
    return count;
}

var gmodal = document.getElementById("GModal");
var gbtn = document.getElementById("GenerateBill");

function update() {
    var update = document.getElementsByClassName("table-p");
    for (var i = 0; i < update.length; i++) {
        update[i].textContent = "Rs. " + TableList[i].TotalBill + "   No. of items: " + TableList[i].noOfItems;
    }
}

function GenerateBill(id) {
    i = id - 1;
    modal.style.display = "none";
    gmodal.style.display = "block";
    var tno = document.getElementById("tno");
    tno.innerHTML = "Table :" + id;

    var Tbil = document.getElementById("TB").innerHTML;
    1
    var Tbill = document.getElementById("Tbill");
    Tbill.innerHTML = " " + "Pay the " + Tbil;

    TableList[i].TotalBill = 0;
    TableList[i].noOfItems = 0;
    TableList[i].items.length = 0;

    var obj = JSON.parse(localStorage.getItem(TableList[i].name));
    for(j=0;j<obj.length;j++)
    {
        obj[j].quantity=0;
    }
    localStorage.setItem(TableList[i].name,JSON.stringify(obj));
    update();
    document.getElementById(id).style.color = 'white';
}

var span1 = document.getElementsByClassName("close1")[0];
span1.onclick = function () {
    gmodal.style.display = "none";
}

function serving(thiss, tableID, value) {

    var parent = thiss.parentElement.parentElement;
    console.log(thiss);
    console.log(thiss.parentElement);
    console.log(parent.innerHTML);
    //var code = parent.innerHTML;
    var retrieveItemName = parent.innerHTML.split('>');
    console.log(retrieveItemName);
    var itemName = retrieveItemName[3].substring(0,retrieveItemName[3].length-4);
   // console.log(item);
    
    TableList[tableID-1].items.push(itemName);
    TableList[tableID-1].noOfItems=TableList[tableID-1].items.length;
    var id=tableID;
    //console.log(tableID);
    var obj = JSON.parse(localStorage.getItem('Table-'+id));
    for(i=0;i<obj.length;i++)
    {
        if(obj[i].item==itemName)
        {
            obj[i].quantity=value;
        }
    }
   
    localStorage.setItem('Table-'+id,JSON.stringify(obj));
    var tempTotal=0;
    for(i=0;i<obj.length;i++)
    {
        tempTotal += obj[i].quantity*obj[i].cost;
    }
    console.log(tempTotal);
    TableList[id-1].TotalBill=tempTotal;
    document.getElementById("TB").innerHTML = "Total Bill :" + TableList[id-1].TotalBill;
    update();

}

function deleteItem(ev) {
    var DelRow = ev.parentElement.parentElement;
    DelRow.remove();
    var price = DelRow.getElementsByClassName("price")[0].textContent;
    var p = parseInt(price);
    var item = DelRow.getElementsByClassName("item")[0].textContent;
    var ID = document.getElementById(ev.id).id;

    var SerialNo = document.getElementsByClassName("Sno");
    for (var i = 0; i < SerialNo.length; i++) {
        SerialNo[i].textContent = i + 1;
    }

    while (TableList[ID - 1].items.indexOf(item) > -1) {
        TableList[ID - 1].items.splice(TableList[ID - 1].items.indexOf(item), 1);
        TableList[ID - 1].noOfItems--;
    }



    var obj = JSON.parse(localStorage.getItem('Table-'+ID));
    for(i=0;i<obj.length;i++)
    {
        if(obj[i].item==item)
        {
            obj[i].quantity=0;
        }
    }

    localStorage.setItem('Table-'+ID,JSON.stringify(obj));
    var tempTotal=0;
    for(i=0;i<obj.length;i++)
    {
        tempTotal += obj[i].quantity*obj[i].cost;
    }
    TableList[ID-1].TotalBill=tempTotal;
   // update();
    document.getElementById("TB").innerHTML = "Total Bill :" + TableList[ID - 1].TotalBill;
    update();

}