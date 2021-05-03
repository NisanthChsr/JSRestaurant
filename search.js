function tableSearch() {
    var input, filter, myTable, table, i;
    input = document.getElementById("TableInput");
    filter = input.value.toUpperCase();
    myTable = document.getElementById("myTable");
    table = myTable.getElementsByClassName("table");


    for (i = 0; i < table.length; i++) {
        var h3 = table[i].getElementsByTagName('h3')[0];
        if (h3) {
            if (h3.innerHTML.toUpperCase().indexOf(filter) > -1) {
                table[i].style.display = "";
            } else {
                table[i].style.display = "none";
            }
        }
    }
}

function debounce(func, timeout = 1000){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

const menuSearch = debounce(() => searchItems());

function searchItems() {
    var input, filter, myMenu, menu, i;
    input = document.getElementById("MenuInput");
    filter = input.value.toUpperCase();
    myMenu = document.getElementById("myMenu");
    menu = myMenu.getElementsByClassName("menu");

    for (i = 0; i < menu.length; i++) {


        var h3 = menu[i].getElementsByTagName("h3")[0];
        //console.log(h3);
        var tag = menu[i].getElementsByTagName('p')[0];
       // console.log(menu[i].getElementsByTagName('p')[0]);
        
            if (h3.innerHTML.toUpperCase().indexOf(filter) > -1 || tag.innerHTML.toUpperCase().indexOf(filter) > -1) {
                menu[i].style.display = "";
            } else {
                menu[i].style.display = "none";
            }
        
    }
}