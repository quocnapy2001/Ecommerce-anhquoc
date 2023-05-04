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


  // Điền thông tin của sản phẩm cần Update vào các ô Input
  // Không điền tên ảnh vào Input File
  $("#IdUpdate").val(listProduct[index].id);
  $("#NameUpdate").val(listProduct[index].name);
  $("#PriceUpdate").val(listProduct[index].price);
  $("#InfoUpdate").val(listProduct[index].info);
  $("#DetailUpdate").val(listProduct[index].detail);
  $("#StarUpdate").val(listProduct[index].ratingStar);
  $("#ManufacturerUpdate").val(listProduct[index].manufacturerId);
  $("#CategoryUpdate").val(listProduct[index].categoryId);


  // Hiển thị Modal Update Product
  $("#ModalUpdateProduct").modal("show");
}


// Hàm xử lý Reset trên Form Update
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


// Hàm xử lý khi nhấn nút Update trên Update Modal
function handleUpdateProduct() {
  // idProductUpdate
  // Tìm index của sản phẩm cần Update trong mảng listProduct
  var index = listProduct.findIndex((product) => product.id == idProductUpdate);


  // Lấy dữ liệu từ các ô Input
  var v_Name = $("#NameUpdate").val();
  var v_Price = $("#PriceUpdate").val();
  var v_Info = $("#InfoUpdate").val();
  var v_Detail = $("#DetailUpdate").val();
  var v_Star = $("#StarUpdate").val();
  // Gọi hàm để lấy tên Ảnh
  var v_Image = getImageName($("#ImageUpdate").val());
  var v_Manufacturer = $("#ManufacturerUpdate").val();
  var v_Category = $("#CategoryUpdate").val();


  // console.log("v_Name", v_Name);
  // console.log("v_Price", v_Price);
  // console.log("v_Info", v_Info);
  // console.log("v_Detail", v_Detail);
  // console.log("v_Star", v_Star);
  // console.log("v_Image:", v_Image);
  // console.log("v_Manufacturer", v_Manufacturer);
  // console.log("v_Category", v_Category);
  // Thực hiện Update thông tin Sản phẩm
  listProduct[index].name = v_Name;
  listProduct[index].price = v_Price;
  listProduct[index].info = v_Info;
  listProduct[index].detail = v_Detail;
  listProduct[index].ratingStar = v_Star;
  // Kiểm tra nếu người dùng chọn lại ảnh thì mới Set dữ liệu mới
  // TH Người dùng không chọn lại ảnh sẽ lấy ảnh hiện tại của sản phẩm
  if (v_Image !== null && v_Image !== "") {
    listProduct[index].imageName = v_Image;
  }
  listProduct[index].manufacturerId = v_Manufacturer;
  listProduct[index].categoryId = v_Category;


  // Lưu lại dữ liệu vào LocalStorage
  localStorage.setItem("listProduct", JSON.stringify(listProduct));


  // Reset Form Update
  handleResetUpdate();


  // Đóng Modal Update
  $("#ModalUpdateProduct").modal("hide");


  // Hiển thị lại dữ liệu sau Update
  fetchListProductAdmin();
}
