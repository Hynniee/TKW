// Doi sang dinh dang tien VND
function vnd(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Close popup 
const body = document.querySelector("body");
let modalContainer = document.querySelectorAll('.modal');
let modalBox = document.querySelectorAll('.mdl-cnt');
let formLogSign = document.querySelector('.forms');

// Click vùng ngoài sẽ tắt Popup
modalContainer.forEach(item => {
    item.addEventListener('click', closeModal);
});

modalBox.forEach(item => {
    item.addEventListener('click', function (event) {
        event.stopPropagation();
    })
});

function closeModal() {
    modalContainer.forEach(item => {
        item.classList.remove('open');
    });
    console.log(modalContainer)
    body.style.overflow = "auto";
}

function increasingNumber(e) {
    let qty = e.parentNode.querySelector('.input-qty');
    if (parseInt(qty.value) < qty.max) {
        qty.value = parseInt(qty.value) + 1;
    } else {
        qty.value = qty.max;
    }
}

function decreasingNumber(e) {
    let qty = e.parentNode.querySelector('.input-qty');
    if (qty.value > qty.min) {
        qty.value = parseInt(qty.value) - 1;
    } else {
        qty.value = qty.min;
    }
}

//Xem chi tiet san pham
function detailProduct(index) {
    let modal = document.querySelector('.modal.product-detail');
    let products = JSON.parse(localStorage.getItem('products'));
    event.preventDefault();
    let infoProduct = products.find(sp => {
        return sp.id === index;
    })
    let modalHtml = `<div class="modal-header">
    <img class="product-image" src="${infoProduct.img}" alt="">
    </div>
    <div class="modal-body">
        <h2 class="product-title">${infoProduct.title}</h2>
        <div class="product-control">
            <div class="priceBox">
                <span class="current-price">${vnd(infoProduct.price)}</span>
            </div>
            <div class="buttons_added">
                <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this)">
                <input class="input-qty" max="100" min="1" name="" type="number" value="1">
                <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this)">
            </div>
        </div>
        <p class="product-description product-detail-desc"></p>
    </div>
    <div class="notebox">
            <p class="notebox-title">Ghi chú</p>
            <textarea class="text-note" id="popup-detail-note" placeholder="Nhập thông tin cần lưu ý..."></textarea>
    </div>
    <div class="modal-footer">
        <div class="price-total">
            <span class="thanhtien">Thành tiền</span>
            <span class="price">${vnd(infoProduct.price)}</span>
        </div>
        <div class="modal-footer-control">
            <button class="button-dathangngay" data-product="${infoProduct.id}">Đặt hàng ngay</button>
            <button class="button-dat" id="add-cart" onclick="animationCart()"><i class="fa-solid fa-basket-shopping"></i>Thêm vào giỏ hàng</button>
        </div>
    </div>`;
    document.querySelector('#product-detail-content').innerHTML = modalHtml;
    modal.classList.add('open');
    body.style.overflow = "hidden";
    //Cap nhat gia tien khi tang so luong san pham
    let tgbtn = document.querySelectorAll('.is-form');
    let qty = document.querySelector('.product-control .input-qty');
    let priceText = document.querySelector('.price');
    tgbtn.forEach(element => {
        element.addEventListener('click', () => {
            let price = infoProduct.price * parseInt(qty.value);
            priceText.innerHTML = vnd(price);
        });
    });
    // Them san pham vao gio hang
    let productbtn = document.querySelector('.button-dat');
    productbtn.addEventListener('click', (e) => {
        addCart(infoProduct.id);
    })
    // Đặt hàng ngay cũng cho phép không cần đăng nhập
    let dathangngayBtn = document.querySelector('.button-dathangngay');
    dathangngayBtn.addEventListener('click', (e) => {
        addCart(infoProduct.id);
        // Có thể chuyển sang trang thanh toán hoặc mở popup tùy ý bạn
        // Ví dụ: window.location.href = "/checkout.html";
    })
    // Mua ngay san pham
    dathangngay();
    const descEl = document.querySelector('.product-detail-desc');
    // Lấy mô tả đầy đủ từ sản phẩm
    const fullDesc = infoProduct.desc;
    const maxLines = 5; // Số dòng muốn hiển thị trước khi "Xem thêm"

    // Gán HTML đầy đủ vào descEl
    descEl.innerHTML = fullDesc;

    // Áp dụng CSS để ẩn bớt nếu dài
    descEl.style.position = 'relative';
    descEl.style.overflow = 'hidden';
    descEl.style.display = '-webkit-box';
    descEl.style.webkitBoxOrient = 'vertical';
    descEl.style.webkitLineClamp = maxLines;
    descEl.style.maxHeight = (1.6 * maxLines) + 'em'; // 1.6em mỗi dòng

    // Tạo nút "Xem thêm" nếu nội dung bị cắt
    setTimeout(() => {
        if (descEl.scrollHeight > descEl.clientHeight + 5) {
            // Tạo fade
            let fade = document.createElement('div');
            fade.style.position = 'absolute';
            fade.style.left = 0;
            fade.style.right = 0;
            fade.style.bottom = 0;
            fade.style.height = '2em';
            fade.style.background = 'linear-gradient(to bottom, rgba(255,255,255,0), #fff 90%)';
            fade.style.pointerEvents = 'none';
            descEl.appendChild(fade);

            // Tạo nút "Xem thêm"
            let more = document.createElement('span');
            more.className = 'desc-more';
            more.textContent = 'Xem thêm';
            more.style.position = 'absolute';
            more.style.right = '0.5em';
            more.style.bottom = '0.2em';
            more.style.background = '#fff';
            more.style.cursor = 'pointer';
            more.style.color = '#35796b';
            more.style.fontWeight = '500';
            more.style.textDecoration = 'underline';
            more.onclick = function(e) {
                e.stopPropagation();
                descEl.style.webkitLineClamp = 'unset';
                descEl.style.maxHeight = 'none';
                descEl.style.overflow = 'visible';
                fade.remove();
                more.remove();
            };
            descEl.appendChild(more);
        }
    }, 10);
}

function animationCart() {
    document.querySelector(".count-product-cart").style.animation = "slidein ease 1s"
    setTimeout(()=>{
        document.querySelector(".count-product-cart").style.animation = "none"
    },1000)
}

// Them SP vao gio hang
function addCart(index) {
    // Nếu chưa có currentuser thì tạo user ẩn danh
    let currentuser = localStorage.getItem('currentuser') 
        ? JSON.parse(localStorage.getItem('currentuser')) 
        : { fullname: "Khách", cart: [] };
    let soluong = document.querySelector('.input-qty').value;
    let popupDetailNote = document.querySelector('#popup-detail-note').value;
    let note = popupDetailNote == "" ? "Không có ghi chú" : popupDetailNote;
    let productcart = {
        id: index,
        soluong: parseInt(soluong),
        note: note
    }
    let vitri = currentuser.cart.findIndex(item => item.id == productcart.id);
    if (vitri == -1) {
        currentuser.cart.push(productcart);
    } else {
        currentuser.cart[vitri].soluong = parseInt(currentuser.cart[vitri].soluong) + parseInt(productcart.soluong);
    }
    localStorage.setItem('currentuser', JSON.stringify(currentuser));
    updateAmount();
    closeModal();
    // toast({ title: 'Success', message: 'Thêm thành công sản phẩm vào giỏ hàng', type: 'success', duration: 3000 });
}

//Show gio hang
function showCart() {
    if (localStorage.getItem('currentuser') != null) {
        let currentuser = JSON.parse(localStorage.getItem('currentuser'));
        if (currentuser.cart.length != 0) {
            document.querySelector('.gio-hang-trong').style.display = 'none';
            document.querySelector('button.thanh-toan').classList.remove('disabled');
            let productcarthtml = '';
            currentuser.cart.forEach(item => {
                let product = getProduct(item);
                productcarthtml += `<li class="cart-item" data-id="${product.id}">
                <div class="cart-item-info">
                    <p class="cart-item-title">
                        ${product.title}
                    </p>
                    <span class="cart-item-price price" data-price="${product.price}">
                    ${vnd(parseInt(product.price))}
                    </span>
                </div>
                <p class="product-note"><i class="fa-solid fa-pencil"></i><span>${product.note}</span></p>
                <div class="cart-item-control">
                   <button class="cart-item-delete" onclick="deleteCartItem(${product.id}, this)">
                    <i class="fa-solid fa-trash"></i> Xóa
                    </button>

                    <div class="buttons_added">
                        <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this)">
                        <input class="input-qty" max="100" min="1" name="" type="number" value="${product.soluong}">
                        <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this)">
                    </div>
                </div>
            </li>`
            });
            document.querySelector('.cart-list').innerHTML = productcarthtml;
            updateCartTotal();
            saveAmountCart();
        } else {
            document.querySelector('.gio-hang-trong').style.display = 'flex'
        }
    }
    let modalCart = document.querySelector('.modal-cart');
    let containerCart = document.querySelector('.cart-container');
    let themmon = document.querySelector('.them-sach');
    modalCart.onclick = function () {
        closeCart();
    }
    themmon.onclick = function () {
        closeCart();
    }
    containerCart.addEventListener('click', (e) => {
        e.stopPropagation();
    })
}

// Delete cart item
function deleteCartItem(id, el) {
    let cartParent = el.parentNode.parentNode;
    cartParent.remove();
    let currentUser = JSON.parse(localStorage.getItem('currentuser'));
    let vitri = currentUser.cart.findIndex(item => item.id = id)
    currentUser.cart.splice(vitri, 1);

    // Nếu trống thì hiển thị giỏ hàng trống
    if (currentUser.cart.length == 0) {
        document.querySelector('.gio-hang-trong').style.display = 'flex';
        document.querySelector('button.thanh-toan').classList.add('disabled');
    }
    localStorage.setItem('currentuser', JSON.stringify(currentUser));
    updateCartTotal();
}

//Update cart total
function updateCartTotal() {
    document.querySelector('.text-price').innerText = vnd(getCartTotal());
}

// Lay tong tien don hang
function getCartTotal() {
    let currentUser = JSON.parse(localStorage.getItem('currentuser'));
    let tongtien = 0;
    if (currentUser != null) {
        currentUser.cart.forEach(item => {
            let product = getProduct(item);
            tongtien += (parseInt(product.soluong) * parseInt(product.price));
        });
    }
    return tongtien;
}

// Get Product 
function getProduct(item) {
    let products = JSON.parse(localStorage.getItem('products'));
    let infoProductCart = products.find(sp => item.id == sp.id)
    let product = {
        ...infoProductCart,
        ...item
    }
    return product;
}

window.onload = updateAmount();
window.onload = updateCartTotal();

// Lay so luong hang

function getAmountCart() {
    let currentuser = JSON.parse(localStorage.getItem('currentuser'))
    let amount = 0;
    currentuser.cart.forEach(element => {
        amount += parseInt(element.soluong);
    });
    return amount;
}

//Update Amount Cart 
function updateAmount() {
    if (localStorage.getItem('currentuser') != null) {
        let amount = getAmountCart();
        document.querySelector('.count-product-cart').innerText = amount;
    }
}

// Save Cart Info
function saveAmountCart() {
    let cartAmountbtn = document.querySelectorAll(".cart-item-control .is-form");
    let listProduct = document.querySelectorAll('.cart-item');
    let currentUser = JSON.parse(localStorage.getItem('currentuser'));
    cartAmountbtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let id = listProduct[parseInt(index / 2)].getAttribute("data-id");
            let productId = currentUser.cart.find(item => {
                return item.id == id;
            });
            productId.soluong = parseInt(listProduct[parseInt(index / 2)].querySelector(".input-qty").value);
            localStorage.setItem('currentuser', JSON.stringify(currentUser));
            updateCartTotal();
        })
    });
}

// Open & Close Cart
function openCart() {
    showCart();
    document.querySelector('.modal-cart').classList.add('open');
    body.style.overflow = "hidden";
}

function closeCart() {
    document.querySelector('.modal-cart').classList.remove('open');
    body.style.overflow = "auto";
    updateAmount();
}

// Open Search Advanced
document.querySelector(".filter-btn").addEventListener("click",(e) => {
    e.preventDefault();
    document.querySelector(".advanced-search").classList.toggle("open");
    document.getElementById("home-service").scrollIntoView();
})

document.querySelector(".form-search-input").addEventListener("click",(e) => {
    e.preventDefault();
    document.getElementById("home-service").scrollIntoView();
})

function closeSearchAdvanced() {
    document.querySelector(".advanced-search").classList.toggle("open");
}

//Open Search Mobile 
function openSearchMb() {
    document.querySelector(".header-middle-left").style.display = "none";
    document.querySelector(".header-middle-center").style.display = "block";
    document.querySelector(".header-middle-right-item.close").style.display = "block";
    let liItem = document.querySelectorAll(".header-middle-right-item.open");
    for(let i = 0; i < liItem.length; i++) {
        liItem[i].style.setProperty("display", "none", "important")
    }
}

//Close Search Mobile 
function closeSearchMb() {
    document.querySelector(".header-middle-left").style.display = "block";
    document.querySelector(".header-middle-center").style.display = "none";
    document.querySelector(".header-middle-right-item.close").style.display = "none";
    let liItem = document.querySelectorAll(".header-middle-right-item.open");
    for(let i = 0; i < liItem.length; i++) {
        liItem[i].style.setProperty("display", "block", "important")
    }
}

//Signup && Login Form

// Chuyen doi qua lai SignUp & Login 
let signup = document.querySelector('.signup-link');
let login = document.querySelector('.login-link');
let container = document.querySelector('.signup-login .modal-container');
login.addEventListener('click', () => {
    container.classList.add('active');
})

signup.addEventListener('click', () => {
    container.classList.remove('active');
})

let signupbtn = document.getElementById('signup');
let loginbtn = document.getElementById('login');
let formsg = document.querySelector('.modal.signup-login')
signupbtn.addEventListener('click', () => {
    formsg.classList.add('open');
    container.classList.remove('active');
    body.style.overflow = "hidden";

})

loginbtn.addEventListener('click', () => {
    document.querySelector('.form-message-check-login').innerHTML = '';
    formsg.classList.add('open');
    container.classList.add('active');
    body.style.overflow = "hidden";
})

// Dang nhap & Dang ky

// Chức năng đăng ký
let signupButton = document.getElementById('signup-button');
let loginButton = document.getElementById('login-button');
signupButton.addEventListener('click', () => {
    event.preventDefault();
    let fullNameUser = document.getElementById('fullname').value;
    let phoneUser = document.getElementById('phone').value;
    let passwordUser = document.getElementById('password').value;
    let passwordConfirmation = document.getElementById('password_confirmation').value;
    let checkSignup = document.getElementById('checkbox-signup').checked;
    // Check validate
    if (fullNameUser.length == 0) {
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ vâ tên';
        document.getElementById('fullname').focus();
    } else if (fullNameUser.length < 3) {
        document.getElementById('fullname').value = '';
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ và tên lớn hơn 3 kí tự';
    } else {
        document.querySelector('.form-message-name').innerHTML = '';
    }
    if (phoneUser.length == 0) {
        document.querySelector('.form-message-phone').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (phoneUser.length != 10) {
        document.querySelector('.form-message-phone').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
        document.getElementById('phone').value = '';
    } else {
        document.querySelector('.form-message-phone').innerHTML = '';
    }
    if (passwordUser.length == 0) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passwordUser.length < 6) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('password').value = '';
    } else {
        document.querySelector('.form-message-password').innerHTML = '';
    }
    if (passwordConfirmation.length == 0) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Vui lòng nhập lại mật khẩu';
    } else if (passwordConfirmation !== passwordUser) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Mật khẩu không khớp';
        document.getElementById('password_confirmation').value = '';
    } else {
        document.querySelector('.form-message-password-confi').innerHTML = '';
    }
    if (checkSignup != true) {
        document.querySelector('.form-message-checkbox').innerHTML = 'Vui lòng check đăng ký';
    } else {
        document.querySelector('.form-message-checkbox').innerHTML = '';
    }

    if (fullNameUser && phoneUser && passwordUser && passwordConfirmation && checkSignup) {
        if (passwordConfirmation == passwordUser) {
            let user = {
                fullname: fullNameUser,
                phone: phoneUser,
                password: passwordUser,
                address: '',
                email: '',
                status: 1,
                join: new Date(),
                cart: [],
                userType: 0
            }
            let accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];
            let checkloop = accounts.some(account => {
                return account.phone == user.phone;
            })
            if (!checkloop) {
                accounts.push(user);
                localStorage.setItem('accounts', JSON.stringify(accounts));
                localStorage.setItem('currentuser', JSON.stringify(user));
                toast({ title: 'Thành công', message: 'Tạo thành công tài khoản !', type: 'success', duration: 3000 });
                closeModal();
                kiemtradangnhap();
                updateAmount();
            } else {
                toast({ title: 'Thất bại', message: 'Tài khoản đã tồn tại !', type: 'error', duration: 3000 });
            }
        } else {
            toast({ title: 'Thất bại', message: 'Sai mật khẩu !', type: 'error', duration: 3000 });
        }
    }
}
)

// Dang nhap
loginButton.addEventListener('click', () => {
    event.preventDefault();
    let phonelog = document.getElementById('phone-login').value;
    let passlog = document.getElementById('password-login').value;
    let accounts = JSON.parse(localStorage.getItem('accounts'));

    if (phonelog.length == 0) {
        document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (phonelog.length != 10) {
        document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
        document.getElementById('phone-login').value = '';
    } else {
        document.querySelector('.form-message.phonelog').innerHTML = '';
    }

    if (passlog.length == 0) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passlog.length < 6) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('passwordlogin').value = '';
    } else {
        document.querySelector('.form-message-check-login').innerHTML = '';
    }

    if (phonelog && passlog) {
        let vitri = accounts.findIndex(item => item.phone == phonelog);
        if (vitri == -1) {
            toast({ title: 'Error', message: 'Tài khoản của bạn không tồn tại', type: 'error', duration: 3000 });
        } else if (accounts[vitri].password == passlog) {
            if(accounts[vitri].status == 0) {
                toast({ title: 'Warning', message: 'Tài khoản của bạn đã bị khóa', type: 'warning', duration: 3000 });
            } else {
                localStorage.setItem('currentuser', JSON.stringify(accounts[vitri]));
                toast({ title: 'Success', message: 'Đăng nhập thành công', type: 'success', duration: 3000 });
                closeModal();
                kiemtradangnhap();
                checkAdmin();
                updateAmount();
            }
        } else {
            toast({ title: 'Warning', message: 'Sai mật khẩu', type: 'warning', duration: 3000 });
        }
    }
})

// Kiểm tra xem có tài khoản đăng nhập không ?
function kiemtradangnhap() {
    let currentUser = localStorage.getItem('currentuser');
    if (currentUser != null) {
        let user = JSON.parse(currentUser);

        // Cập nhật phần hiển thị tên tài khoản
        document.querySelector('.auth-container').innerHTML = `
            <span class="text-dndk">Tài khoản</span>
            <span class="text-tk">${user.fullname} <i class="fa-solid fa-caret-down"></i></span>
        `;

        // ✅ Khai báo trước để dùng chung
        let menuHtml = '';

        if (user.fullname === "Khách") {
            // Nếu là khách thì chỉ có nút Thoát
            menuHtml = `
                <li class="border"><a id="logout" href="javascript:;"><i class="fa-solid fa-right-from-bracket"></i> Thoát tài khoản</a></li>
            `;
        } else {
            // Nếu là tài khoản thật
            menuHtml = `
                <li><a href="javascript:;" onclick="myAccount()"><i class="fa-solid fa-user"></i> Tài khoản của tôi</a></li>
                <li><a href="javascript:;" onclick="orderHistory()"><i class="fa-solid fa-bag-shopping"></i> Đơn hàng đã mua</a></li>
                <li class="border"><a id="logout" href="javascript:;"><i class="fa-solid fa-right-from-bracket"></i> Thoát tài khoản</a></li>
            `;
        }

        // Gắn menu vào DOM
        document.querySelector('.header-middle-right-menu').innerHTML = menuHtml;

        // Gán sự kiện logout
        document.querySelector('#logout').addEventListener('click', logOut);
    }
}

function logOut() {
    let user = JSON.parse(localStorage.getItem('currentuser'));
    if (user && user.fullname !== "Khách") {
        let accounts = JSON.parse(localStorage.getItem('accounts'));
        let vitri = accounts.findIndex(item => item.phone == user.phone);
        if (vitri !== -1) {
            accounts[vitri].cart.length = 0;
            for (let i = 0; i < user.cart.length; i++) {
                accounts[vitri].cart[i] = user.cart[i];
            }
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
    }
    localStorage.removeItem('currentuser');
    window.location.href = "index.html";
}

function checkAdmin() {
    let user = JSON.parse(localStorage.getItem('currentuser'));
    if(user && user.userType == 1) {
        let node = document.createElement(`li`);
        node.innerHTML = `<a href="./admin.html"><i class="-solid fa-gear"></i> Quản lý cửa hàng</a>`
        document.querySelector('.header-middle-right-menu').prepend(node);
    } 
}

window.onload = kiemtradangnhap();
window.onload = checkAdmin();

// Chuyển đổi trang chủ và trang thông tin tài khoản
function myAccount() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('trangchu').classList.add('hide');
    document.getElementById('order-history').classList.remove('open');
    document.getElementById('account-user').classList.add('open');
    userInfo();
}

// Chuyển đổi trang chủ và trang xem lịch sử đặt hàng 
function orderHistory() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('account-user').classList.remove('open');
    document.getElementById('trangchu').classList.add('hide');
    document.getElementById('order-history').classList.add('open');
    renderOrderProduct();
}
//
function renderOrderProduct() {
    var orders = JSON.parse(localStorage.getItem('order') || '[]');
    var orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '[]');
    var currentUser = JSON.parse(localStorage.getItem('currentuser'));
    var html = '';
    var section = document.querySelector('.order-history-section');
    if (!section) return;

    // Lọc đơn hàng của user hiện tại
    var userOrders = orders.filter(order => order.khachhang === currentUser.phone);

    if (userOrders.length === 0) {
        html = '<p>Bạn chưa có đơn hàng nào.</p>';
    } else {
        html = `<table class="order-table" style="width:100%;border-collapse:collapse;">
            <tr>
                <th>Mã đơn</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Tổng tiền</th>
                <th>Chi tiết</th>
            </tr>`;
        userOrders.reverse().forEach(order => {
            html += `<tr>
                <td>${order.id}</td>
                <td>${formatDate(order.thoigiandat)}</td>
                <td>${order.trangthai === 0 ? 'Chờ xác nhận' : 'Đã xử lý'}</td>
                <td>${vnd(order.tongtien)}</td>
                <td>
                    <button onclick="showOrderDetail('${order.id}')" style="padding:4px 12px;border-radius:4px;background:#35796b;color:#fff;border:none;cursor:pointer;">Xem</button>
                </td>
            </tr>`;
        });
        html += '</table>';
    }
    section.innerHTML = html;
}

// Hàm xem chi tiết đơn hàng
function showOrderDetail(orderId) {
    var orders = JSON.parse(localStorage.getItem('order') || '[]');
    var orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '[]');
    var order = orders.find(o => o.id === orderId);
    var details = orderDetails.filter(d => d.madon === orderId);

    var html = `<h4>Mã đơn: ${order.id}</h4>
        <p><b>Ngày đặt:</b> ${formatDate(order.thoigiandat)}</p>
        <p><b>Người nhận:</b> ${order.tenguoinhan} - ${order.sdtnhan}</p>
        <p><b>Địa chỉ:</b> ${order.diachinhan}</p>
        <p><b>Ghi chú:</b> ${order.ghichu}</p>
        <p><b>Trạng thái:</b> ${order.trangthai === 0 ? 'Chờ xác nhận' : 'Đã xử lý'}</p>
        <table style="width:100%;margin-top:10px;border-collapse:collapse;">
            <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
            </tr>`;
    details.forEach(item => {
        var product = getProductInfo(item.id);
        html += `<tr>
            <td>${product ? product.title : 'Sản phẩm đã xóa'}</td>
            <td>${item.soluong}</td>
            <td>${vnd(item.price)}</td>
        </tr>`;
    });
    html += `</table>
        <p style="margin-top:10px;"><b>Tổng tiền:</b> ${vnd(order.tongtien)}</p>`;

    // Hiện popup chi tiết đơn hàng
    var modal = document.querySelector('.modal.detail-order');
    var content = document.querySelector('.detail-order-content');
    if (modal && content) {
        content.innerHTML = html;
        modal.classList.add('open');
    }
}

function closeOrderDetail() {
    var modal = document.querySelector('.modal.detail-order');
    if (modal) modal.classList.remove('open');
}
function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function userInfo() {
    let user = JSON.parse(localStorage.getItem('currentuser'));
    document.getElementById('infoname').value = user.fullname;
    document.getElementById('infophone').value = user.phone;
    document.getElementById('infoemail').value = user.email;
    document.getElementById('infoaddress').value = user.address;
    if (user.email == undefined) {
        infoemail.value = '';
    }
    if (user.address == undefined) {
        infoaddress.value = '';
    }
}

// Thay doi thong tin
function changeInformation() {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let user = JSON.parse(localStorage.getItem('currentuser'));
    let infoname = document.getElementById('infoname');
    let infoemail = document.getElementById('infoemail');
    let infoaddress = document.getElementById('infoaddress');

    user.fullname = infoname.value;
    if (infoemail.value.length > 0) {
        if (!emailIsValid(infoemail.value)) {
            document.querySelector('.inforemail-error').innerHTML = 'Vui lòng nhập lại email!';
            infoemail.value = '';
        } else {
            user.email = infoemail.value;
        }
    }

    if (infoaddress.value.length > 0) {
        user.address = infoaddress.value;
    }

    let vitri = accounts.findIndex(item => item.phone == user.phone)

    accounts[vitri].fullname = user.fullname;
    accounts[vitri].email = user.email;
    accounts[vitri].address = user.address;
    localStorage.setItem('currentuser', JSON.stringify(user));
    localStorage.setItem('accounts', JSON.stringify(accounts));
    kiemtradangnhap();
    toast({ title: 'Success', message: 'Cập nhật thông tin thành công !', type: 'success', duration: 3000 });
}

// Đổi mật khẩu 
function changePassword() {
    let currentUser = JSON.parse(localStorage.getItem("currentuser"));
    let passwordCur = document.getElementById('password-cur-info');
    let passwordAfter = document.getElementById('password-after-info');
    let passwordConfirm = document.getElementById('password-comfirm-info');
    let check = true;
    if (passwordCur.value.length == 0) {
        document.querySelector('.password-cur-info-error').innerHTML = 'Vui lòng nhập mật khẩu hiện tại';
        check = false;
    } else {
        document.querySelector('.password-cur-info-error').innerHTML = '';
    }

    if (passwordAfter.value.length == 0) {
        document.querySelector('.password-after-info-error').innerHTML = 'Vui lòn nhập mật khẩu mới';
        check = false;
    } else {
        document.querySelector('.password-after-info-error').innerHTML = '';
    }

    if (passwordConfirm.value.length == 0) {
        document.querySelector('.password-after-comfirm-error').innerHTML = 'Vui lòng nhập mật khẩu xác nhận';
        check = false;
    } else {
        document.querySelector('.password-after-comfirm-error').innerHTML = '';
    }

    if (check == true) {
        if (passwordCur.value.length > 0) {
            if (passwordCur.value == currentUser.password) {
                document.querySelector('.password-cur-info-error').innerHTML = '';
                if (passwordAfter.value.length > 0) {
                    if (passwordAfter.value.length < 6) {
                        document.querySelector('.password-after-info-error').innerHTML = 'Vui lòng nhập mật khẩu mới có số  kí tự lớn hơn bằng 6';
                    } else {
                        document.querySelector('.password-after-info-error').innerHTML = '';
                        if (passwordConfirm.value.length > 0) {
                            if (passwordConfirm.value == passwordAfter.value) {
                                document.querySelector('.password-after-comfirm-error').innerHTML = '';
                                currentUser.password = passwordAfter.value;
                                localStorage.setItem('currentuser', JSON.stringify(currentUser));
                                let userChange = JSON.parse(localStorage.getItem('currentuser'));
                                let accounts = JSON.parse(localStorage.getItem('accounts'));
                                let accountChange = accounts.find(acc => {
                                    return acc.phone = userChange.phone;
                                })
                                accountChange.password = userChange.password;
                                localStorage.setItem('accounts', JSON.stringify(accounts));
                                toast({ title: 'Success', message: 'Đổi mật khẩu thành công !', type: 'success', duration: 3000 });
                            } else {
                                document.querySelector('.password-after-comfirm-error').innerHTML = 'Mật khẩu bạn nhập không trùng khớp';
                            }
                        } else {
                            document.querySelector('.password-after-comfirm-error').innerHTML = 'Vui lòng xác nhận mật khẩu';
                        }
                    }
                } else {
                    document.querySelector('.password-after-info-error').innerHTML = 'Vui lòng nhập mật khẩu mới';
                }
            } else {
                document.querySelector('.password-cur-info-error').innerHTML = 'Bạn đã nhập sai mật khẩu hiện tại';
            }
        }
    }
}

function getProductInfo(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(item => {
        return item.id == id;
    })
}



// Get Order Details
function getOrderDetails(madon) {
    let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : [];
    let ctDon = [];
    orderDetails.forEach(item => {
        if(item.madon == madon) {
            ctDon.push(item);
        }
    });
    return ctDon;
}

// Hàm định dạng ngày
function formatDate(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    if (isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Cập nhật ngày giao dự kiến
function updateDeliveryDate() {
    const today = new Date();
    const estimatedDate = new Date();

    // Kiểm tra loại giao hàng
    const isExpress = document.getElementById('ship-express').checked;
    const addDays = isExpress ? 2 : 5;

    estimatedDate.setDate(today.getDate() + addDays);

    document.getElementById('estimated-delivery-date').textContent = formatDate(estimatedDate);
}

// Gọi khi trang tải xong
updateDeliveryDate();

// Gắn sự kiện khi thay đổi lựa chọn
document.getElementById('ship-standard').addEventListener('change', updateDeliveryDate);
document.getElementById('ship-express').addEventListener('change', updateDeliveryDate);

// Xử lý popup chính sách
const openBtn = document.getElementById("open-policy");
const popup = document.getElementById("policy-popup");

if (openBtn && popup) {
    openBtn.addEventListener("click", () => {
        popup.style.display = "flex";
    });
}

function closePolicy() {
    const popup = document.getElementById("policy-popup");
    if (popup) popup.style.display = "none";
}
// Xem chi tiet don hang
function detailOrder(id) {
    let order = JSON.parse(localStorage.getItem("order"));
    let detail = order.find(item => {
        return item.id == id;
    })
    document.querySelector(".modal.detail-order").classList.add("open");
    let detailOrderHtml = `<ul class="detail-order-group">
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-calendar-days"></i> Ngày đặt hàng</span>
            <span class="detail-order-item-right">${formatDate(detail.thoigiandat)}</span>
        </li>
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-truck"></i> Hình thức giao</span>
            <span class="detail-order-item-right">${detail.hinhthucgiao}</span>
        </li>
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-clock"></i> Ngày nhận hàng</span>
            <span class="detail-order-item-right">${(detail.thoigiangiao == "" ? "" : (detail.thoigiangiao + " - ")) + formatDate(detail.ngaygiaohang)}</span>
        </li>
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-location-dot"></i> Địa điểm nhận</span>
            <span class="detail-order-item-right">${detail.diachinhan}</span>
        </li>
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-thin fa-person"></i> Người nhận</span>
            <span class="detail-order-item-right">${detail.tenguoinhan}</span>
        </li>
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-phone"></i> Số điện thoại nhận</span>
            <span class="detail-order-item-right">${detail.sdtnhan}</span>
        </li>
    </ul>`
    document.querySelector(".detail-order-content").innerHTML = detailOrderHtml;
}

// Create id order 
function createId(arr) {
    let id = arr.length + 1;
    let check = arr.find(item => item.id == "DH" + id)
    while (check != null) {
        id++;
        check = arr.find(item => item.id == "DH" + id)
    }
    return "DH" + id;
}

// Back to top
window.onscroll = () => {
    let backtopTop = document.querySelector(".back-to-top")
    if (document.documentElement.scrollTop > 100) {
        backtopTop.classList.add("active");
    } else {
        backtopTop.classList.remove("active");
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Auto hide header on scroll
const headerNav = document.querySelector(".header-bottom");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if(lastScrollY < window.scrollY) {
        headerNav.classList.add("hide")
    } else {
        headerNav.classList.remove("hide")
    }
    lastScrollY = window.scrollY;
})

// Page
function renderProducts(showProduct) {
    let productHtml = '';
    if(showProduct.length == 0) {
        document.getElementById("home-title").style.display = "none";
        productHtml = `<div class="no-result"><div class="no-result-h">Tìm kiếm không có kết quả</div><div class="no-result-p">Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn</div><div class="no-result-i"><i class="fa-solid fa-face-sad-cry"></i></div></div>`;
    } else {
        document.getElementById("home-title").style.display = "block";
        showProduct.forEach((product) => {
            productHtml += `<div class="col-product">
            <article class="card-product" >
                <div class="card-header">
                    <a href="#" class="card-image-link" onclick="detailProduct(${product.id})">
                    <img class="card-image" src="${product.img}" alt="${product.title}">
                    </a>
                </div>
                <div class="book-info">
                    <div class="card-content">
                        <div class="card-title">
                            <a href="#" class="card-title-link" onclick="detailProduct(${product.id})">${product.title}</a>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="product-price">
                            <span class="current-price">${vnd(product.price)}</span>
                        </div>
                    <div class="product-buy">
                        <button onclick="detailProduct(${product.id})" class="card-button order-item"><i class="fa-solid fa-cart-shopping-fast"></i>Mua ngay</button>
                    </div> 
                </div>
                </div>
            </article>
        </div>`;
        });
    }
    document.getElementById('home-products').innerHTML = productHtml;
}

// Find Product
var productAll = JSON.parse(localStorage.getItem('products')).filter(item => item.status == 1);
function searchProducts(mode) {
    let valeSearchInput = document.querySelector('.form-search-input').value;
    let valueCategory = document.getElementById("advanced-search-category-select").value;
    let minPrice = document.getElementById("min-price").value;
    let maxPrice = document.getElementById("max-price").value;
    if(parseInt(minPrice) > parseInt(maxPrice) && minPrice != "" && maxPrice != "") {
        alert("Giá đã nhập sai !");
    }

    let result = valueCategory == "Tất cả" ? productAll : productAll.filter((item) => {
        return item.category == valueCategory;
    });

    result = valeSearchInput == "" ? result : result.filter(item => {
        return item.title.toString().toUpperCase().includes(valeSearchInput.toString().toUpperCase());
    })

    if(minPrice == "" && maxPrice != "") {
        result = result.filter((item) => item.price <= maxPrice);
    } else if (minPrice != "" && maxPrice == "") {
        result = result.filter((item) => item.price >= minPrice);
    } else if(minPrice != "" && maxPrice != "") {
        result = result.filter((item) => item.price <= maxPrice && item.price >= minPrice);
    }

    document.getElementById("home-service").scrollIntoView();
    switch (mode){
        case 0:
            result = JSON.parse(localStorage.getItem('products'));;
            document.querySelector('.form-search-input').value = "";
            document.getElementById("advanced-search-category-select").value = "Tất cả";
            document.getElementById("min-price").value = "";
            document.getElementById("max-price").value = "";
            break;
        case 1:
            result.sort((a,b) => a.price - b.price)
            break;
        case 2:
            result.sort((a,b) => b.price - a.price)
            break;
    }
    showHomeProduct(result)
}

// Phân trang 
let perPage = 12;
let currentPage = 1;
let totalPage = 0;
let perProducts = [];

function displayList(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = (currentPage - 1) * perPage + perPage;
    let productShow = productAll.slice(start, end);
    renderProducts(productShow);
}

function showHomeProduct(products) {
    let productAll = products.filter(item => item.status == 1)
    displayList(productAll, perPage, currentPage);
    setupPagination(productAll, perPage, currentPage);
}

window.onload = showHomeProduct(JSON.parse(localStorage.getItem('products')))

function setupPagination(productAll, perPage, currentPage) {
    const pageNav = document.querySelector('.page-nav-list');
    pageNav.innerHTML = '';
    const page_count = Math.ceil(productAll.length / perPage);

    // Nút prev
    let prev = document.createElement('li');
    prev.className = 'page-nav-item' + (currentPage === 1 ? ' disabled' : '');
    prev.innerHTML = `<a href="javascript:;">◀</a>`;
    if (currentPage > 1) {
        prev.onclick = () => {
            setupPagination(productAll, perPage, currentPage - 1);
            displayList(productAll, perPage, currentPage - 1);
            document.getElementById("home-service").scrollIntoView();
        };
    }
    pageNav.appendChild(prev);

    // Trang đầu
    pageNav.appendChild(paginationChange(1, productAll, perPage, currentPage));

    // Dấu ...
    if (currentPage > 4) {
        let ellipsis = document.createElement('li');
        ellipsis.className = 'page-nav-item ellipsis';
        ellipsis.textContent = '...';
        pageNav.appendChild(ellipsis);
    }

    // Các trang gần trang hiện tại
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(page_count - 1, currentPage + 1); i++) {
        pageNav.appendChild(paginationChange(i, productAll, perPage, currentPage));
    }

    // Dấu ...
    if (currentPage < page_count - 3) {
        let ellipsis = document.createElement('li');
        ellipsis.className = 'page-nav-item ellipsis';
        ellipsis.textContent = '...';
        pageNav.appendChild(ellipsis);
    }

    // Trang cuối
    if (page_count > 1) {
        pageNav.appendChild(paginationChange(page_count, productAll, perPage, currentPage));
    }

    // Nút next
    let next = document.createElement('li');
    next.className = 'page-nav-item' + (currentPage === page_count ? ' disabled' : '');
    next.innerHTML = `<a href="javascript:;">▶</a>`;
    if (currentPage < page_count) {
        next.onclick = () => {
            setupPagination(productAll, perPage, currentPage + 1);
            displayList(productAll, perPage, currentPage + 1);
            document.getElementById("home-service").scrollIntoView();
        };
    }
    pageNav.appendChild(next);
}

function paginationChange(page, productAll, perPage, currentPage) {
    let node = document.createElement('li');
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="javascript:;">${page}</a>`;
    if (currentPage == page) node.classList.add('active');
    node.onclick = function () {
        setupPagination(productAll, perPage, page);
        displayList(productAll, perPage, page);
        document.getElementById("home-service").scrollIntoView();
    };
    return node;
}
// Hiển thị chuyên mục
function showCategory(category) {
    document.getElementById('trangchu').classList.remove('hide');
    document.getElementById('account-user').classList.remove('open');
    document.getElementById('order-history').classList.remove('open');
    let productSearch = productAll.filter(value => {
        return value.category.toString().toUpperCase().includes(category.toUpperCase());
    })
    let currentPageSeach = 1;
    displayList(productSearch, perPage, currentPageSeach);
    setupPagination(productSearch, perPage, currentPageSeach);
    document.getElementById("home-title").scrollIntoView();
        console.log("Chọn danh mục:", category);

    // Gợi ý: bạn có thể lưu danh mục được chọn
    localStorage.setItem("danhmucDangXem", category);

    // Và chuyển về trang chính (trangchu), ví dụ:
    document.getElementById('trangchu').style.display = 'block';
    document.getElementById('subpage-container').style.display = 'none';

    // Sau đó gọi hàm để lọc sản phẩm theo danh mục (nếu có)
    // ví dụ:
    // renderProductTheoDanhMuc(tendanhmuc);
}

// Slider banner responsive + touch + dot navigation
let currentSlide = 0;
const slides = document.querySelectorAll('.home-slider img');
const totalSlides = slides.length;

// Tạo dot navigation
const slider = document.querySelector('.home-slider');
let dotsContainer = slider.querySelector('.slider-dots');
if (!dotsContainer) {
    dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    slider.appendChild(dotsContainer);
}
dotsContainer.innerHTML = '';
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.onclick = function() {
        currentSlide = i;
        showSlide(currentSlide);
        resetInterval();
    };
    dotsContainer.appendChild(dot);
}

function showSlide(index) {
    slides.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    // Cập nhật dot
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}
if (slides.length > 0) {
    showSlide(currentSlide);
}

// Tự động chuyển ảnh mỗi 5 giây, reset khi click dot
let autoInterval = setInterval(nextSlide, 5000);
function resetInterval() {
    clearInterval(autoInterval);
    autoInterval = setInterval(nextSlide, 5000);
}

// Vuốt cảm ứng trên mobile
let startX = 0;
let endX = 0;
if (slider) {
    slider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    slider.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) {
            prevSlide();
            resetInterval();
        }
        else if (startX - endX > 50) {
            nextSlide();
            resetInterval();
        }
    });
}
// Hiển thị popup QR code
function showQrPopup() {
    document.getElementById('qr-popup').style.display = 'flex';
}
function closeQrPopup() {
    document.getElementById('qr-popup').style.display = 'none';}
    document.getElementById('qr-popup').addEventListener('click', function(e) {
    if (e.target === this) {
        closeQrPopup();
    }
});

// Đóng popup khi ấn ra ngoài
document.getElementById('info-popup').addEventListener('click', function(e) {
    if (e.target === this) closeInfoPopup();
});

function closeInfoPopup() {
    document.getElementById('info-popup').style.display = 'none';
}
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//
 document.addEventListener("DOMContentLoaded", function () {
        const toggleBtn = document.getElementById("menu-toggle");
        const menuList = document.querySelector(".header-bottom .menu-list");

        toggleBtn.addEventListener("click", function () {
            menuList.classList.toggle("active");
        });
    });

//
function loadSubPage(page) {
  // 1. Ẩn các phần chính (nếu có)
  const mainSections = ['trangchu', 'account-user', 'order-history'];
  mainSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // 2. Hiện vùng subpage-container
  const container = document.getElementById('subpage-container');
  if (container) container.style.display = 'block';

  // 3. Tải nội dung từ file con
  fetch(page)
    .then(res => {
      if (!res.ok) throw new Error('Trang không tồn tại');
      return res.text();
    })
    .then(html => {
      container.innerHTML = html;
      window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll lên đầu nếu cần
    })
    .catch(err => {
      container.innerHTML = `<p style="color:red;">Không thể tải nội dung: ${err.message}</p>`;
      console.error("Lỗi load subpage:", err);
    });
}
// Địa chỉ động: tỉnh, huyện, xã
document.addEventListener('DOMContentLoaded', function() {
    const provinceSelect = document.getElementById('province-select');
    const districtSelect = document.getElementById('district-select');
    const wardSelect = document.getElementById('ward-select');

    if (provinceSelect && districtSelect && wardSelect) {
        // Load tỉnh
        fetch('https://provinces.open-api.vn/api/p/')
            .then(res => res.json())
            .then(provinces => {
                provinces.forEach(p => {
                    let opt = document.createElement('option');
                    opt.value = p.code;
                    opt.textContent = p.name;
                    provinceSelect.appendChild(opt);
                });
            });

        provinceSelect.onchange = function() {
            const code = this.value;
            districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';
            wardSelect.innerHTML = '<option value="">Chọn phường/xã</option>';
            wardSelect.disabled = true;
            if (!code) {
                districtSelect.disabled = true;
                return;
            }
            fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
                .then(res => res.json())
                .then(data => {
                    data.districts.forEach(d => {
                        let opt = document.createElement('option');
                        opt.value = d.code;
                        opt.textContent = d.name;
                        districtSelect.appendChild(opt);
                    });
                    districtSelect.disabled = false;
                });
        };

        districtSelect.onchange = function() {
            const code = this.value;
            wardSelect.innerHTML = '<option value="">Chọn phường/xã</option>';
            if (!code) {
                wardSelect.disabled = true;
                return;
            }
            fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
                .then(res => res.json())
                .then(data => {
                    data.wards.forEach(w => {
                        let opt = document.createElement('option');
                        opt.value = w.code;
                        opt.textContent = w.name;
                        wardSelect.appendChild(opt);
                    });
                    wardSelect.disabled = false;
                });
        };
    }
});
const province = document.getElementById('province-select').selectedOptions[0].textContent;
const district = document.getElementById('district-select').selectedOptions[0].textContent;
const ward = document.getElementById('ward-select').selectedOptions[0].textContent;
const fullAddress = `${ward}, ${district}, ${province}`;
//quên pass
document.getElementById('forgot-password-link').onclick = function() {
    document.getElementById('forgot-password-popup').style.display = 'flex';
    document.getElementById('forgot-message').textContent = '';
    document.getElementById('forgot-email').value = '';
};
document.getElementById('forgot-send-btn').onclick = function() {
    const email = document.getElementById('forgot-email').value.trim();
    const msg = document.getElementById('forgot-message');
    if (!email) {
        msg.textContent = 'Vui lòng nhập email!';
        return;
    }
    msg.style.color = '#35796b';
    msg.textContent = 'Nếu email hợp lệ, hướng dẫn đặt lại mật khẩu sẽ được gửi đến bạn!';
    setTimeout(() => {
        document.getElementById('forgot-password-popup').style.display = 'none';
    }, 3000);
};
//giấu dot trên mobile
document.getElementById("menu-toggle").addEventListener("click", function () {
    document.body.classList.toggle("menu-open");
});
// Đóng menu khi click vào link
document.querySelectorAll('.header-bottom .menu-list a').forEach(function(link) {
    link.addEventListener('click', function() {
        document.querySelector('.header-bottom .menu-list').classList.remove('active');
        document.body.classList.remove('menu-open'); // Nếu bạn dùng class này để ẩn slider-dots
    });
});
//
function getFullAddress() {
    var provinceSelect = document.getElementById('province-select');
    var districtSelect = document.getElementById('district-select');
    var wardSelect = document.getElementById('ward-select');
    if (!provinceSelect || !districtSelect || !wardSelect) return '';
    var province = provinceSelect.selectedOptions[0] ? provinceSelect.selectedOptions[0].textContent : '';
    var district = districtSelect.selectedOptions[0] ? districtSelect.selectedOptions[0].textContent : '';
    var ward = wardSelect.selectedOptions[0] ? wardSelect.selectedOptions[0].textContent : '';
    if (!province || !district || !ward
        || province === "Chọn tỉnh/thành phố"
        || district === "Chọn quận/huyện"
        || ward === "Chọn phường/xã") return '';
    return ward + ', ' + district + ', ' + province;
}

// Cập nhật giá trị input ẩn mỗi khi chọn địa chỉ
['province-select', 'district-select', 'ward-select'].forEach(function(id) {
    var sel = document.getElementById(id);
    if (sel) {
        sel.addEventListener('change', function() {
            var diachiInput = document.getElementById('diachinhan');
            if (diachiInput) diachiInput.value = getFullAddress();
        });
    }
});
//khi ấn vào mục nào trong menu thì mục đó sẽ được đánh dấu là active
document.querySelectorAll('.menu-link').forEach(function(link) {
    link.addEventListener('click', function() {
        document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
document.querySelectorAll('.dropdown-content li a').forEach(function(link) {
    link.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-content li a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
