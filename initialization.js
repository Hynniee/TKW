//Khoi tao danh sach san pham
function createProduct() {
    if (localStorage.getItem('products') == null) {
        let products = [{
            id: 1,
            status: 1, 
            title: 'Vở bài tập Tiếng Việt lớp 3',
            img: './images/products/gk1.webp',
            category: 'Giáo khoa',
            price: 200000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 2,
            status: 1, 
            title: 'Vật lý lớp 12',
            img: './images/products/gk2.webp',
            category: 'Giáo khoa',
            price: 180000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 3,
            status: 1, 
            title: 'Ngữ văn lớp 12',
            img: './images/products/gk3.webp',
            category: 'Giáo khoa',
            price: 180000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 4,
            status: 1, title: 'Toán 11',
            img: './images/products/gk4.webp',
            category: 'Giáo khoa',
            price: 699000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 5,
            status: 1, 
            title: 'Lịch sử 12',
            img: './images/products/gk5.webp',
            category: 'Giáo khoa',
            price: 280000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 6,
            status: 1, 
            title: 'Hóa học 12',
            img: './images/products/gk6.jpg',
            category: 'Giáo khoa',
            price: 540000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 7,
            status: 1, 
            title: 'Ngữ văn 11',
            category: 'Giáo khoa',
            img: './images/products/gk7.webp',
            price: 340000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 8,
            status: 1, 
            title: 'Vật lí 11',
            img: './images/products/gk8.webp',
            category: 'Giáo khoa',
            price: 140000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 9,
            status: 1, 
            title: 'Ngữ văn 11',
            img: './images/products/gk9.webp',
            category: 'Giáo khoa',
            price: 140000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },        {
            id: 10,
            status: 1, 
            title: 'Âm nhạc 10',
            img: './images/products/gk10.webp',
            category: 'Giáo khoa',
            price: 140000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 11,
            status: 1, 
            title: 'Giải thích ngữ pháp tiếng Anh',
            category: 'Ngoại ngữ',
            img: './images/products/nn1.webp',
            price: 60000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 12,
            status: 1, 
            title: 'Luyện nói tiếng Trung Quốc cấp tốc cho người mới bắt đầu',
            img: './images/products/nn2.webp',
            category: 'Ngoại ngữ',
            price: 140000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 13,
            status: 1, 
            title: '301 câu đàm thoại tiếng Hoa',
            img: './images/products/nn3.webp',
            category: 'Ngoại ngữ',
            price: 60000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 14,
            status: 1, 
            title: 'Giáo trình Hán Ngữ',
            img: './images/products/nn4.webp',
            category: 'Ngoại ngữ',
            price: 60000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 15,
            status: 1, 
            title: 'KIZUKI KIDS - Tiếng Nhật dành cho trẻ em Việt Nam',
            img: './images/products/nn5.jpg',
            category: 'Ngoại ngữ',
            price: 60000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 16,
            status: 1, 
            title: 'Top 1500+ cụm từ tiếng Anh thông dụng theo chủ đề',
            img: './images/products/nn6.webp',
            category: 'Ngoại ngữ',
            price: 60000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 17,
            status: 1, 
            title: 'Vở luyện viết tiếng Anh Starters',
            img: './images/products/nn7.webp',
            category: 'Ngoại ngữ',
            price: 60000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 18,
            status: 1, 
            title: 'Luyện nói tiếng Trung Quốc cấp tốc trình độ sơ cấp',
            img: './images/products/nn8.webp',
            category: 'Ngoại ngữ',
            price: 60000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 19,
            status: 1, 
            title: 'EASY EMAIL WRITING - Viết email thật dễ dàng',
            img: './images/products/nn9.jpg',
            category: 'Ngoại ngữ',
            price: 60000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 20,
            status: 1, 
            title: 'Giới từ tiếng Anh',
            img: './images/products/nn10.webp',
            category: 'Ngoại ngữ',
            price: 60000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 21,
            status: 1, 
            title: 'Cây cam ngọt của tôi',
            category: 'Tiểu thuyết',
            img: './images/products/tt1.jpg',
            price: 550000,
            desc: 'Cây cam ngọt của tôi là một tác phẩm nổi tiếng của nhà văn Phùng Quán, kể về cuộc sống của một cậu bé nghèo khó và tình yêu thương của mẹ dành cho con. Câu chuyện mang đến những bài học quý giá về tình cảm gia đình, sự kiên cường và nghị lực trong cuộc sống.'
        },
        {
            id: 22,
            status: 1, 
            title: 'Người bà tài giỏi vùng SAGA',
            category: 'Tiểu thuyết',
            img: './images/products/tt2.webp',
            price: 550000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 23,
            status: 1, 
            title: 'Totto-chan bên cửa sổ',
            category: 'Tiểu thuyết',
            img: './images/products/tt3.webp',
            price: 510000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 24,
            status: 1, 
            title: 'Chiến binh cầu vồng',
            img: './images/products/tt4.webp',
            category: 'Tiểu thuyết',
            price: 950000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 25,
            status: 1, 
            title: 'Cho tôi xin một vé đi tuổi thơ',
            img: './images/products/tt5.webp',
            category: 'Tiểu thuyết',
            price: 350000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 26,
            status: 1, 
            title: 'Vượt Côn Đảo',
            category: 'Tiểu thuyết',
            img: './images/products/tt6.webp',
            price: 450000,
            desc: 'Vượt Côn Đảo là một tác phẩm nổi tiếng của nhà văn Nguyễn Thị Ngọc Tú, kể về cuộc sống của những người tù chính trị tại Côn Đảo trong thời kỳ kháng chiến chống Pháp. Tác phẩm mang đến những hình ảnh chân thực về cuộc sống khắc nghiệt, tinh thần kiên cường và lòng yêu nước của những người dân Việt Nam.'
        },

        {
            id: 27,
            status: 1, 
            title: 'Anne tóc đỏ dưới chái nhà xanh',
            category: 'Tiểu thuyết',
            img: './images/products/tt7.webp',
            price: 520000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 28,
            status: 1, 
            title: 'Con chim xanh biếc bay về',
            category: 'Tiểu thuyết',
            img: './images/products/tt8.webp',
            price: 350000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 29,
            status: 1, 
            title: 'Kẻ trộm sách',
            category: 'Tiểu thuyết',
            img: './images/products/tt9.webp',
            price: 420000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 30,
            status: 1, 
            title: 'Bà ngoại tôi gửi lời xin lỗi',
            category: 'Tiểu thuyết',
            img: './images/products/tt10.webp',
            price: 175000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 31,
            status: 1, 
            title: 'Công tử mồ côi',
            category: 'Tiểu thuyết',
            img: './images/products/tt11.webp',
            price: 350000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 32,
            status: 1, 
            title: 'One Piece',
            category: 'Truyện tranh',
            img: './images/products/ttranh1.webp',
            price: 460000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 33,
            status: 1, 
            title: 'Bảng xếp hạng quân vương',
            category: 'Truyện tranh',
            img: './images/products/ttranh2.webp',
            price: 200000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 34,
            status: 1, 
            title: 'Conan - Thám tử lừng danh tập 105',
            category: 'Truyện tranh',
            img: './images/products/ttranh3.webp',
            price: 270000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 35,
            status: 1, 
            title: 'Conan - Thám tử lừng danh tập 103',
            category: 'Truyện tranh',
            img: './images/products/ttranh4.webp',
            price: 300000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 36,
            status: 1, 
            title: 'Thám tử Xeno và 7 căn phòng kín',
            category: 'Truyện tranh',
            img: './images/products/ttranh5.webp',
            price: 280000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 37,
            status: 1, 
            title: 'One Punch Man tập 29',
            category: 'Truyện tranh',
            img: './images/products/ttranh6.jpg',
            price: 280000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 38,
            status: 1, 
            title: 'Doraemon - Nobita và hòn đảo diệu kì - cuộc phiêu lưu của loài thú',
            category: 'Truyện tranh',
            img: './images/products/ttranh7.webp',
            price: 140000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 39,
            status: 1, 
            title: 'Doraemon - Nobita và cuộc đại thủy chiến ở xứ sở người cá',
            category: 'Truyện tranh',
            img: './images/products/ttranh8.webp',
            price: 60000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 40,
            status: 1, 
            title: 'Dragon Ball - phần ba: cuộc đổ bộ của nười Saiya',
            category: 'Truyện tranh',
            img: './images/products/ttranh9.webp',
            price: 50000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },

        {
            id: 41,
            status: 1, 
            title: 'Naruto quyển 34',
            category: 'Truyện tranh',
            img: './images/products/ttranh10.jpg',
            price: 50000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.'
        },
        {
            id: 42,
            status: 1, 
            title: 'Được học',
            category: "Kỹ năng sống",
            img: './images/products/kỹ năng sông/c1.webp',
            price: 699000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.',
        },
        {
            id: 43,
            status: 1, 
            title: 'Sức mạnh của tư duy phản biện',
            category: "Kỹ năng sống",
            img: './images/products/kỹ năng sông/c5.webp',
            price: 550000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.',
        },
        {
            id: 44,
            status: 1, 
            title: 'Làm chủ tư duy',
            category: "Kỹ năng sống",
            img: './images/products/kỹ năng sông/c6.webp',
            price: 220000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.',
        },
        {
            id: 45,
            status: 1, 
            title: 'Phá vỡ khuôn mẫu',
            category: "Kỹ năng sống",
            img: './images/products/kỹ năng sông/c7.webp',
            price: 75000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.',
        },
        {
            id: 46,
            status: 1, 
            title: 'Dám ước mơ',
            category: "Kỹ năng sống",
            img: './images/products/kỹ năng sông/c8.webp',
            price: 75000,
            desc: 'chưa biết nói gì về sản phẩm này, nhưng chắc chắn sẽ là một sản phẩm chất lượng, đáng để mua sắm.',
        },
        {
            id: 47,
            status: 1, 
            title: 'Sáng tạo - bừng cháy sức mạnh bên trong',
            category: "Kỹ năng sống",
            img: './images/products/kỹ năng sông/c9.jpg',
            price: 170000,
            desc: 'chưa biết nói gì',
        },
        {
            id: 48,
            status: 1, 
            title: 'Khai mở tâm trí',
            category: "Kỹ năng sống",
            img: './images/products/kỹ năng sông/c10.webp',
            price: 170000,
            desc: 'chưa biết nói gì',
        },
        {
            id: 49,
            status: 1, 
            title: 'Hoàng tử bé',
            category: "Thiếu nhi",
            img: './images/products/sách thiếu nhi/cuốn1.webp',
            price: 80000,
            desc: 'chưa biết',
        },
        {
            id: 50,
            status: 1, 
            title: 'Tự tin',
            category: "Thiếu nhi",
            img: './images/products/sách thiếu nhi/cuốn2.webp',
            price: 80000,
            desc: 'chưa biết',
        },
        {
            id: 51,
            status: 1, 
            title: 'Tuyển tập truyện cổ tích Việt Nam',
            category: "Thiếu nhi",
            img: './images/products/sách thiếu nhi/cuốn3.webp',
            price: 80000,
            desc: 'chưa biết',
        },
        {
            id: 52,
            status: 1, 
            title: 'Giúp trẻ làm chủ cảm xúc - nhận biết và thiếu hiểu cảm xúc',
            category: "Thiếu nhi",
            img: './images/products/sách thiếu nhi/cuốn4.webp',
            price: 80000,
            desc: 'chưa biết',
        },
        {
            id: 53,
            status: 1, 
            title: 'Hungry Babies - Những em bé đói ngấu',
            category: "Thiếu nhi",
            img: './images/products/sách thiếu nhi/cuốn6.webp',
            price: 80000,
            desc: 'chưa biết',
        },
        {
            id: 54,
            status: 1, 
            title: 'Nuôi dưỡng tình bạn - Voi và Ỉn là đôi bạn thân',
            category: "Thiếu nhi",
            img: './images/products/sách thiếu nhi/cuốn7.webp',
            price: 80000,
            desc: 'chưa biết',
        },
        // {
        //     id: 55,
        //     status: 1, 
        //     title: 'Cơm cháy chà bông',
        //     category: "Món ăn vặt",
        //     img: './assets/img/products/com-chay-cha-bong.jpg',
        //     price: 60000,
        //     desc: 'Cơm cháy chà bông có thể bảo quản cả tháng mà ăn vẫn ngon và đóng gói rất tiện.',
        // },
        {
            id: 56,
            status: 1, 
            title: 'Gà con Piyo nói lời cảm ơn',
            category: "Thiếu nhi",
            img: './images/products/sách thiếu nhi/cuốn8.webp',
            price: 80000,
            desc: 'chưa biết',
        },
        {
            id: 57,
            status: 1, 
            title: 'Mình có cái gì đặc biệt nhỉ?',
            category: "Thiếu nhi",
            img: './images/products/sách thiếu nhi/cuốn9.webp',
            price: 80000,
            desc: 'chưa biết',
        },
        {
            id: 58,
            status: 1, 
            title: 'Bé điểm danh nào!',
            category: "Thiếu nhi",
            img: './images/products/sách thiếu nhi/cuón10.webp',
            price: 80000,
            desc: 'chưa biết',
        },
        ]
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Create admin account 
// function createAdminAccount() {
//     let accounts = localStorage.getItem("accounts");
//     if (!accounts) {
//         accounts = [];
//         accounts.push({
//             fullname: "Hoàng Gia Bảo",
//             phone: "hgbaodev",
//             password: "123456",
//             address: 'https://github.com/hgbaodev',
//             email: 'musicanime2501@gmail.com',
//             status: 1,
//             join: new Date(),
//             cart: [],
//             userType: 1
//         })
//         accounts.push({
//             fullname: "Trần Nhật Sinh",
//             phone: "0123456789",
//             password: "123456",
//             address: '',
//             email: '',
//             status: 1,
//             join: new Date(),
//             cart: [],
//             userType: 1
//         })
//         localStorage.setItem('accounts', JSON.stringify(accounts));
//     }
// }

window.onload = createProduct();
//window.onload = createAdminAccount();

