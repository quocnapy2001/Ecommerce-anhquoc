var listProduct = [];
$(function () {
  loadComponent();
  setTimeout(() => {
    featchListProduct();
  }, 200);
});


function loadComponent(params) {
  $(".MenuSection").load("./component/Menu.html");
  $(".BannerSection").load("./component/Banner.html");
  $(".ProductSection").load("./component/Product.html");
  $(".FooterSection").load("./component/Footer.html");
}


function featchListProduct(params) {
  $.ajax({
    type: "GET",
    url: "https://645644432e41ccf1691829a1.mockapi.io/products",
    dataType: "json",
    success: function (response, status) {

      if (status === "success") {
        listProduct = response;
        for (let index = 0; index < listProduct.length; index++) {
          $(".ProductList").append(`
          <!-- SP 1 -->
          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="text-align: left; width: 300px; height: 500px">
            <!-- Ảnh -->
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <img src="../Asset/Product/${listProduct[index].imageName}" alt="" style="width: 190px; height: 190px" />
              </div>
            </div>
            <!-- Tên sản phẩm -->
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h3 style="font-weight: bold">${listProduct[index].name}</h3>
              </div>
            </div>
            <!-- Hãng sản xuất -->
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h4>Hãng sản xuất: ${listProduct[index].manufacturerName}</h4>
              </div>
            </div>
            <!-- Đánh giá -->
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ul class="rating" style="list-style: none; display: flex; font-size: 20px; padding-inline-start: 0px">
              
                  ${showStarRating(listProduct[index].ratingStar)}
                </ul>
              </div>
            </div>
            <!-- Thêm vào giỏ hàng -->
            <div class="row">
              <div class="col-sm-4 col-md-4 col-lg-4">
                <h4>${listProduct[index].price}</h4>
              </div>
      
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <button type="button" class="btn btn-default" style="border: 0px">
                  <i class="fa fa-shopping-cart" style="color: red; font-size: 35px"></i>
                </button>
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
          <!-- Finish SP 1 -->
          `);
        }
      } else {
        console.log("Error when loading data!!");
        return;
      }
    },
  });
}



function showStarRating(ratingStar) {
  let starRating = "";
  for (let index = 1; index <= ratingStar; index++) {
    starRating += `
      <li>
         <i class="fa fa-star selected" style="color: orange"></i>
      </li>`;
  }
  for (let index = 1; index <= 5 - ratingStar; index++) {
    starRating += `
    <li>
       <i class="fa fa-star"></i>
    </li>`;
  }
  return starRating;
}
