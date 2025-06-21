history.pushState({ page: "current" }, "", window.location.href);
const PHIVANCHUYEN = 30000;
function getPhiVanChuyen(tongTien) {
    if (tongTien >= 300000) return 0;        // Miễn phí với đơn từ 300k
    if (tongTien >= 200000) return 20000;   // 20k nếu đơn ≥ 200k
    if (tongTien >= 100000) return 10000;    // 10k nếu đơn ≥ 100k
    return PHIVANCHUYEN;                     // Mặc định là 30k
}

let priceFinal = document.getElementById("checkout-cart-price-final");
// Trang thanh toan
function thanhtoanpage(option,product) {

    let totalBillOrder = document.querySelector('.total-bill-order');
    let totalBillOrderHtml;
    // Xu ly don hang
    switch (option) {
        case 1:{ // Truong hop thanh toan san pham trong gio
            // Hien thi don hang
            showProductCart();
            let tongTien = getCartTotal();
            let phiVC = getPhiVanChuyen(tongTien);
            // Tinh tien
            totalBillOrderHtml = `<div class="priceFlx">
            <div class="text">
                Tiền hàng 
                <span class="count">${getAmountCart()} món</span>
            </div>
            <div class="price-detail">
                <span id="checkout-cart-total">${vnd(getCartTotal())}</span>
            </div>
        </div>
        <div class="priceFlx chk-ship">
            <div class="text">Phí vận chuyển</div>
            <div class="price-detail chk-free-ship">
                <span>${vnd(phiVC)}</span>
            </div>
        </div>`;
            // Tong tien
            priceFinal.innerText = vnd(tongTien + phiVC);
            break;}
        case 2: {// Truong hop mua ngay
            // Hien thi san pham
            showProductBuyNow(product);
            let tongTien = product.soluong * product.price;
            let phiVC = getPhiVanChuyen(tongTien);
            // Tinh tien
            totalBillOrderHtml = `<div class="priceFlx">
                <div class="text">
                    Tiền hàng 
                    <span class="count">${product.soluong} món</span>
                </div>
                <div class="price-detail">
                    <span id="checkout-cart-total">${vnd(product.soluong * product.price)}</span>
                </div>
            </div>
            <div class="priceFlx chk-ship">
                <div class="text">Phí vận chuyển</div>
                <div class="price-detail chk-free-ship">
                    <span>${vnd(phiVC)}</span>
                </div>
            </div>`
            // Tong tien
            priceFinal.innerText = vnd(tongTien + phiVC);
            break;
    }}

    // Tinh tien
    totalBillOrder.innerHTML = totalBillOrderHtml;
    // Hien thi trang thanh toan
    document.querySelector('.checkout-page').classList.add('active');
    // Hien thi cac phuong thuc thanh toan
    let paymentMethods = document.querySelector('.checkout-payment-methods');
    let paymentMethodsHtml = `<div class="checkout-type-order">
        <label class="active">
            <input type="radio" name="payment-method" value="cash" checked>
            <span>Thanh toán khi nhận hàng</span>
        </label>
        <label>
            <input type="radio" name="payment-method" value="online">
            <span>Thanh toán online</span>
        </label>
        <label>
            <input type="radio" name="payment-method" value="bank">
            <span>Chuyển khoản ngân hàng</span>
        </label>
    </div>`;    
    let chkShip = document.querySelectorAll(".chk-ship");

    // Su kien khu nhan nut dat hang
    document.querySelector(".complete-checkout-btn").onclick = () => {
        switch (option) {
            case 1:
                xulyDathang();
                break;
            case 2:
                xulyDathang(product);
                break;
        }
    }
    
}

// Hien thi hang trong gio
function showProductCart() {
    let currentuser = JSON.parse(localStorage.getItem('currentuser'));
    let listOrder = document.getElementById("list-order-checkout");
    let listOrderHtml = '';
    currentuser.cart.forEach(item => {
        let product = getProduct(item);
        listOrderHtml += `<div class="book-total">
        <div class="count">${product.soluong}x</div>
        <div class="info-book">
            <div class="name-book">${product.title}</div>
        </div>
    </div>`
    })
    listOrder.innerHTML = listOrderHtml;
}

// Hien thi hang mua ngay
function showProductBuyNow(product) {
    let listOrder = document.getElementById("list-order-checkout");
    let listOrderHtml = `<div class="book-total">
        <div class="count">${product.soluong}x</div>
        <div class="info-book">
            <div class="name-book">${product.title}</div>
        </div>
    </div>`;
    listOrder.innerHTML = listOrderHtml;
}

//Open Page Checkout
let nutthanhtoan = document.querySelector('.thanh-toan')
let checkoutpage = document.querySelector('.checkout-page');
nutthanhtoan.addEventListener('click', () => {
    checkoutpage.classList.add('active');
    thanhtoanpage(1);
    closeCart();
    body.style.overflow = "hidden"
})

// Đặt hàng ngay
function dathangngay() {
    let productInfo = document.getElementById("product-detail-content");
    let datHangNgayBtn = productInfo.querySelector(".button-dathangngay");
    datHangNgayBtn.onclick = () => {
        if(localStorage.getItem('currentuser')) {
            let productId = datHangNgayBtn.getAttribute("data-product");
            let soluong = parseInt(productInfo.querySelector(".buttons_added .input-qty").value);
            let notevalue = productInfo.querySelector("#popup-detail-note").value;
            let ghichu = notevalue == "" ? "Không có ghi chú" : notevalue;
            let products = JSON.parse(localStorage.getItem('products'));
            let a = products.find(item => item.id == productId);
            a.soluong = parseInt(soluong);
            a.note = ghichu;
            checkoutpage.classList.add('active');
            thanhtoanpage(2,a);
            closeCart();
            body.style.overflow = "hidden"
        } else {
            toast({ title: 'Warning', message: 'Chưa đăng nhập tài khoản !', type: 'warning', duration: 3000 });
        }
    }
}

// Close Page Checkout
function closecheckout() {
    checkoutpage.classList.remove('active');
    body.style.overflow = "auto"
}

// Thong tin cac don hang da mua - Xu ly khi nhan nut dat hang
function xulyDathang(product) {
    // let diachinhan = "";
    let hinhthucthanhtoan = document.querySelector('input[name="payment-method"]:checked')?.value || "cash";
    let currentUser = JSON.parse(localStorage.getItem('currentuser'));
    let diachinhanInput = document.querySelector("#diachinhan");
if (!diachinhanInput) {
    toast({ title: 'Lỗi', message: 'Không tìm thấy trường địa chỉ nhận hàng!', type: 'error', duration: 4000 });
    return;
}
let diachinhan = diachinhanInput.value;
    let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : [];
    let order = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let madon = createId(order);
    let tongtien = 0;
    if(product == undefined) {
        currentUser.cart.forEach(item => {
            item.madon = madon;
            item.price = getpriceProduct(item.id);
            tongtien += item.price * item.soluong;
            orderDetails.push(item);
        });
    } else {
        product.madon = madon;
        product.price = getpriceProduct(product.id);
        tongtien += product.price * product.soluong;
        orderDetails.push(product);
    }   
    
    let tennguoinhan = document.querySelector("#tennguoinhan").value;
    let sdtnhan = document.querySelector("#sdtnhan").value

    // Kiểm tra từng trường, thiếu thì focus và return luôn
    if (tennguoinhan == "") {
        document.querySelector("#tennguoinhan").focus();
        toast({ title: 'Chú ý', message: 'Vui lòng nhập tên người nhận!', type: 'warning', duration: 4000 });
        return;
    }
    if (sdtnhan == "") {
        document.querySelector("#sdtnhan").focus();
        toast({ title: 'Chú ý', message: 'Vui lòng nhập số điện thoại nhận hàng!', type: 'warning', duration: 4000 });
        return;
    }
    // Thêm kiểm tra số điện thoại phải đủ 10 số
    if (!/^\d{10}$/.test(sdtnhan)) {
        document.querySelector("#sdtnhan").focus();
        toast({ title: 'Chú ý', message: 'Số điện thoại không được là kí tự và phải đủ 10 số!', type: 'warning', duration: 4000 });
        return;
    }
    if (diachinhan == "") {
        document.querySelector("#diachinhan").focus();
        toast({ title: 'Chú ý', message: 'Vui lòng chọn địa chỉ nhận hàng!', type: 'warning', duration: 4000 });
        return;
}

    // Nếu đủ thông tin thì tiếp tục đặt hàng
    let donhang = {
        id: madon,
        khachhang: currentUser.phone,
        hinhthucthanhtoan: hinhthucthanhtoan,
        ghichu: document.querySelector(".note-order")?.value || "Không có ghi chú",
        tenguoinhan: tennguoinhan,
        sdtnhan: sdtnhan,
        diachinhan: diachinhan,
        thoigiandat: new Date(),
        tongtien:tongtien,
        trangthai: 0
    }
const momoChecked = document.getElementById('payment-momo').checked;
    const bankChecked = document.getElementById('payment-bank').checked;
    if (momoChecked || bankChecked) {
        showQrPopup(); // Hiện popup mã QR cho cả hai trường hợp
        return false;
    }
    order.unshift(donhang);
    if(product == null) {
        currentUser.cart.length = 0;
    }

    localStorage.setItem("order",JSON.stringify(order));
    localStorage.setItem("currentuser",JSON.stringify(currentUser));
    localStorage.setItem("orderDetails",JSON.stringify(orderDetails));
    toast({ title: 'Thành công', message: 'Đặt hàng thành công !', type: 'success', duration: 1000 });
    setTimeout((e)=>{
        window.location = "index.html";
    },1000);  
}

function getpriceProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    let sp = products.find(item => {
        return item.id == id;
    })
    return sp.price;
}
window.addEventListener('popstate', function() {
    window.location.href = "index.html";
});


// Hiệu ứng phản hồi khi chọn radio cho thanh toán & vận chuyển
document.querySelectorAll('.checkout-type-order').forEach(group => {
    group.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            group.querySelectorAll('label').forEach(label => label.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
        // Kích hoạt sẵn cho radio được checked khi load trang
        if (radio.checked) {
            radio.parentElement.classList.add('active');
        }
    });
});
