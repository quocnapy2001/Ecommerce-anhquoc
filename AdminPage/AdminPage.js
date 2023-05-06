listProduct = [];
var idProductUpdate = "";
$(function () {
  loadComponentAdmin();
});


function loadComponentAdmin(params) {
  $(".MenuSection").load("./MenuAdmin.html");
  $(".SideBarSection").load("./SideBarAdmin.html");
}


function handleShowProduct(params) {
  $(".ProductAdminSection").load("./ContentProductAdmin.html", "data", function (response, status, request) {
    fetchListProductAdmin();
  });
}

function handleShowManufacturer(params) {
  $(".ProductAdminSection").load("./ContentManufacturerAdmin.html", "data", function (response, status, request) {});
}

function handleShowCategory(params) {
  $(".ProductAdminSection").load("./ContentCategoryAdmin.html", "data", function (response, status, request) {});
}

function handleShowAccount(params) {
  $(".ProductAdminSection").load("./ContentAccountAdmin.html", "data", function (response, status, request) {});
}


function handleCreateNewProduct(params) {
  var v_Id = $("#Id").val();
  var v_Name = $("#Name").val();
  var v_Price = $("#Price").val();
  var v_Info = $("#Info").val();
  var v_Detail = $("#Detail").val();
  var v_Image = getImageName($("#Image").val());
  var v_Manufacturer = $("#Manufacturer").val();
  var v_Category = $("#Category").val();


  var ProductNew = {
    id: v_Id,
    name: v_Name,
    price: v_Price,
    info: v_Info,
    detail: v_Detail,
    ratingStar: v_Star,
    imageName: v_Image,
    manufacturerId: v_Manufacturer,
    categoryId: v_Category,
  };

  listProduct.push(ProductNew);
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
  handleResetForm();
  fetchListProductAdmin();
}

function fetchListProductAdmin(params) {
  listProduct = [];
  if (localStorage && localStorage.getItem("listProduct")) {
    var listProductLocalStorage = JSON.parse(localStorage.getItem("listProduct"));
    listProduct = listProductLocalStorage;
  }


  $("#tbProductAdmin").empty();
  for (let index = 0; index < listProduct.length; index++) {
    $("#tbProductAdmin").append(`
    <tr>
      <td>${listProduct[index].id}</td>
      <td>${listProduct[index].name}</td>
      <td>${listProduct[index].price}</td>
      <td>${listProduct[index].info}</td>
      <td>${listProduct[index].detail}</td>
      <td>${listProduct[index].ratingStar}</td>
      <td>${listProduct[index].imageName}</td>
      <td>${listProduct[index].manufacturerId}</td>
      <td>${listProduct[index].categoryId}</td>
      <td>
        <button type="button" class="btn btn-warning" onclick="handleEdit(${listProduct[index].id})">Edit</button>
      </td>
      <td>
        <button type="button" class="btn btn-danger" onclick="handleDelete(${listProduct[index].id})">Delete</button>
      </td>
  </tr>
    `);
  }
}


function handleResetForm() {
  $("#Id").val("");
  $("#Name").val("");
  $("#Price").val("");
  $("#Info").val("");
  $("#Detail").val("");
  $("#Star").val("");
  $("#Image").val("");
  $("#Manufacturer").val("");
  $("#Category").val("");
}



function getImageName(pathImage) {
  var itemArray = pathImage.split("\\");
  var imageName = itemArray[itemArray.length - 1];
  return imageName;
}


function handleDelete(idDelete) {
  var confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
  if (confirmDelete) {
    var indexPrductDelete = listProduct.findIndex((product) => product.id == idDelete);


    if (indexPrductDelete !== -1) {
      listProduct.splice(indexPrductDelete, 1);
      localStorage.setItem("listProduct", JSON.stringify(listProduct));
      fetchListProductAdmin();
    } else {
      alert("Không thể xóa sản phẩm");
    }
  }
}


function handleEdit(idEditProduct) {
  idProductUpdate = idEditProduct;
  var index = listProduct.findIndex((product) => product.id == idProductUpdate);



  $("#IdUpdate").val(listProduct[index].id);
  $("#NameUpdate").val(listProduct[index].name);
  $("#PriceUpdate").val(listProduct[index].price);
  $("#InfoUpdate").val(listProduct[index].info);
  $("#DetailUpdate").val(listProduct[index].detail);
  $("#StarUpdate").val(listProduct[index].ratingStar);
  $("#ManufacturerUpdate").val(listProduct[index].manufacturerId);
  $("#CategoryUpdate").val(listProduct[index].categoryId);



  $("#ModalUpdateProduct").modal("show");
}



function handleResetUpdate() {
  $("#NameUpdate").val("");
  $("#PriceUpdate").val("");
  $("#InfoUpdate").val("");
  $("#DetailUpdate").val("");
  $("#StarUpdate").val("");
  $("#ImageUpdate").val("");
  $("#ManufacturerUpdate").val(0);
  $("#CategoryUpdate").val(0);
}



function handleUpdateProduct() {

  var index = listProduct.findIndex((product) => product.id == idProductUpdate);



  var v_Name = $("#NameUpdate").val();
  var v_Price = $("#PriceUpdate").val();
  var v_Info = $("#InfoUpdate").val();
  var v_Detail = $("#DetailUpdate").val();
  var v_Star = $("#StarUpdate").val();

  var v_Image = getImageName($("#ImageUpdate").val());
  var v_Manufacturer = $("#ManufacturerUpdate").val();
  var v_Category = $("#CategoryUpdate").val();


  listProduct[index].name = v_Name;
  listProduct[index].price = v_Price;
  listProduct[index].info = v_Info;
  listProduct[index].detail = v_Detail;
  listProduct[index].ratingStar = v_Star;

  if (v_Image !== null && v_Image !== "") {
    listProduct[index].imageName = v_Image;
  }
  listProduct[index].manufacturerId = v_Manufacturer;
  listProduct[index].categoryId = v_Category;


  localStorage.setItem("listProduct", JSON.stringify(listProduct));


  handleResetUpdate();


  $("#ModalUpdateProduct").modal("hide");


  fetchListProductAdmin();
}
