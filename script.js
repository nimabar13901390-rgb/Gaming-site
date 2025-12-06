// اسکریپت‌های سایت گیمینگ

$(document).ready(function() {
    
    // 🕐 نمایش تاریخ و ساعت
    function updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const persianDate = now.toLocaleDateString('fa-IR', options);
        $('#date-time').text(persianDate);
    }
    
    // به‌روزرسانی هر ثانیه
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // 📊 آمار پویا
    function animateCounter(elementId, target, duration = 2000) {
        const element = document.getElementById(elementId);
        const start = parseInt(element.textContent.replace(/,/g, ''));
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString('fa-IR');
        }, 16);
    }
    
    // شبیه‌سازی آمار
    setTimeout(() => {
        animateCounter('total-players', 4321567);
        animateCounter('tournaments', 1289);
        animateCounter('downloads-count', 10234);
        animateCounter('posts-today', 456);
    }, 1000);
    
    // 🎮 اسلایدر
    const swiper = new Swiper('.mainSwiper', {
        direction: 'horizontal',
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
    
    // 📰 فیلتر اخبار
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        filterNews(filter);
    });
    
    // نمونه اخبار
    const newsData = [
        {
            id: 1,
            category: 'cod',
            title: 'آپدیت جدید کالاف موبایل با مپ اضافه شد',
            image: 'images/news/cod-update.jpg',
            date: '2 ساعت پیش',
            views: '12,456',
            excerpt: 'فصل جدید کالاف موبایل با مپ جدید، اسلحه‌های افسانه‌ای و رویدادهای ویژه...'
        },
        {
            id: 2,
            category: 'ff',
            title: 'تورنمنت جهانی فری‌فایر با جوایز میلیونی',
            image: 'images/news/ff-tournament.jpg',
            date: '5 ساعت پیش',
            views: '8,923',
            excerpt: 'رقابت بهترین تیم‌های جهان در فری‌فایر با جوایز 2 میلیون دلاری...'
        },
        {
            id: 3,
            category: 'pubg',
            title: 'رونمایی از مپ جدید پابجی موبایل',
            image: 'images/news/pubg-map.jpg',
            date: '1 روز پیش',
            views: '23,789',
            excerpt: 'مپ Rondo با جزئیات خیره‌کننده و وسایل نقلیه جدید به بازی اضافه شد...'
        },
        {
            id: 4,
            category: 'cod',
            title: 'بهترین کلاس‌های Season 11 کالاف',
            image: 'images/news/cod-classes.jpg',
            date: '1 روز پیش',
            views: '15,342',
            excerpt: 'آموزش تنظیم بهترین کلاس‌های اسلحه برای فصل جدید کالاف موبایل...'
        },
        {
            id: 5,
            category: 'ff',
            title: 'کاراکتر جدید فری‌فایر معرفی شد',
            image: 'images/news/ff-character.jpg',
            date: '2 روز پیش',
            views: '7,891',
            excerpt: 'کاراکتر Alok با قابلیت‌های ویژه به مجموعه شخصیت‌های فری‌فایر اضافه شد...'
        },
        {
            id: 6,
            category: 'pubg',
            title: 'راهنمای کامل تسلط بر اسنایپینگ',
            image: 'images/news/pubg-sniping.jpg',
            date: '3 روز پیش',
            views: '31,456',
            excerpt: 'آموزش تکنیک‌های حرفه‌ای اسنایپینگ در پابجی موبایل...'
        }
    ];
    
    function filterNews(category) {
        const newsContainer = $('#news-container');
        newsContainer.empty();
        
        const filteredNews = category === 'all' ? newsData : newsData.filter(news => news.category === category);
        
        filteredNews.forEach(news => {
            const newsCard = `
                <div class="col-md-4 mb-4">
                    <div class="news-card" data-category="${news.category}">
                        <div class="news-image">
                            <img src="${news.image}" alt="${news.title}">
                        </div>
                        <div class="news-content">
                            <span class="news-tag">${getCategoryName(news.category)}</span>
                            <h3 class="news-title">${news.title}</h3>
                            <p>${news.excerpt}</p>
                            <div class="news-meta">
                                <span><i class="fas fa-calendar"></i> ${news.date}</span>
                                <span><i class="fas fa-eye"></i> ${news.views}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            newsContainer.append(newsCard);
        });
    }
    
    function getCategoryName(category) {
        switch(category) {
            case 'cod': return 'کالاف دیوتی';
            case 'ff': return 'فری‌فایر';
            case 'pubg': return 'پابجی';
            default: return 'خبر';
        }
    }
    
    // بارگذاری اولیه اخبار
    filterNews('all');
    
    // 🏆 داده‌های رنکینگ
    const rankingData = [
        { rank: 1, player: 'ProGamer_IR', game: 'cod', kd: 4.2, wins: 342, score: 9850 },
        { rank: 2, player: 'SniperKing', game: 'pubg', kd: 3.8, wins: 289, score: 8765 },
        { rank: 3, player: 'FF_Champion', game: 'ff', kd: 5.1, wins: 456, score: 9540 },
        { rank: 4, player: 'COD_Master', game: 'cod', kd: 3.9, wins: 312, score: 8320 },
        { rank: 5, player: 'PUBG_Pro', game: 'pubg', kd: 3.5, wins: 267, score: 7890 },
        { rank: 6, player: 'Fire_Legend', game: 'ff', kd: 4.7, wins: 398, score: 9010 },
        { rank: 7, player: 'Mobile_Shooter', game: 'cod', kd: 3.7, wins: 301, score: 7650 },
        { rank: 8, player: 'Battle_Royale', game: 'pubg', kd: 3.3, wins: 245, score: 7120 }
    ];
    
    function loadRanking() {
        const tbody = $('#ranking-body');
        tbody.empty();
        
        rankingData.forEach(player => {
            const row = `
                <tr>
                    <td>
                        <span class="rank-badge rank-${player.rank}">${player.rank}</span>
                    </td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="images/users/avatar${player.rank}.jpg" class="player-avatar me-2" width="30" height="30">
                            ${player.player}
                        </div>
                    </td>
                    <td>
                        <span class="game-badge ${player.game}">${getGameName(player.game)}</span>
                    </td>
                    <td><span class="kd-value">${player.kd}</span></td>
                    <td>${player.wins}</td>
                    <td><strong>${player.score.toLocaleString('fa-IR')}</strong></td>
                </tr>
            `;
            tbody.append(row);
        });
    }
    
    function getGameName(game) {
        switch(game) {
            case 'cod': return 'کالاف';
            case 'ff': return 'فری‌فایر';
            case 'pubg': return 'پابجی';
            default: return game;
        }
    }
    
    // بارگذاری رنکینگ
    loadRanking();
    
    // 📱 دکمه بازگشت به بالا
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
    });
    
    $('#backToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });
    
    // 🔔 اعلان آنلاین
    function updateOnlineUsers() {
        const baseUsers = 127;
        const randomChange = Math.floor(Math.random() * 21) - 10; // تغییر 10- تا 10+
        const newUsers = Math.max(100, baseUsers + randomChange);
        $('#online-users').text(newUsers.toLocaleString('fa-IR'));
        
        // تغییر متن زنده
        const liveTexts = [
            "درحال پخش: تورنمنت کالاف موبایل",
            "لایو: آموزش اسنایپینگ حرفه‌ای",
            "مسابقه: تیم ایران مقابل تیم کره",
            "آپدیت: فصل جدید فری‌فایر",
            "زنده: رقابت‌های پابجی پرو"
        ];
        const randomText = liveTexts[Math.floor(Math.random() * liveTexts.length)];
        $('#live-text').text(randomText);
    }
    
    // به‌روزرسانی هر 30 ثانیه
    setInterval(updateOnlineUsers, 30000);
    
    // 🎮 رویدادهای کارت بازی‌ها
    $('.btn-game').click(function() {
        const gameCard = $(this).closest('.game-card');
        const gameTitle = gameCard.find('.game-title').text();
        
        Swal.fire({
            title: 'شروع بازی',
            text: `آماده‌ای ${gameTitle} را شروع کنی؟`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'بله، شروع کن!',
            cancelButtonText: 'بعداً',
            background: '#161622',
            color: '#ffffff',
            confirmButtonColor: '#ff003c'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'موفقیت‌آمیز!',
                    text: `درحال راه‌اندازی ${gameTitle}...`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    });
    
    $('.btn-guide').click(function() {
        const gameCard = $(this).closest('.game-card');
        const gameTitle = gameCard.find('.game-title').text();
        
        Swal.fire({
            title: 'راهنمای بازی',
            html: `
                <div class="text-start">
                    <h6>آموزش‌های موجود برای ${gameTitle}:</h6>
                    <ul>
                        <li>آموزش مبتدی تا پیشرفته</li>
                        <li>بهترین تنظیمات حساسیت</li>
                        <li>راهنمای نقشه‌ها</li>
                        <li>ترفندهای پیشرفته</li>
                        <li>راهنمای اسلحه‌ها</li>
                    </ul>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'مشاهده آموزش‌ها',
            background: '#161622',
            color: '#ffffff',
            confirmButtonColor: '#00a8ff'
        });
    });
    
    // 📥 رویداد دانلود
    $('.btn-download-full').click(function() {
        const downloadCard = $(this).closest('.download-card');
        const title = downloadCard.find('h3').text();
        
        Swal.fire({
            title: 'آماده دانلود',
            text: `فایل ${title} آماده دانلود است`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'دانلود (320MB)',
            cancelButtonText: 'انصراف',
            background: '#161622',
            color: '#ffffff',
            confirmButtonColor: '#ff003c'
        }).then((result) => {
            if (result.isConfirmed) {
                // شبیه‌سازی دانلود
                let progress = 0;
                const downloadTimer = setInterval(() => {
                    progress += 10;
                    if (progress >= 100) {
                        clearInterval(downloadTimer);
                        Swal.fire({
                            title: 'دانلود کامل شد!',
                            text: 'فایل با موفقیت دانلود شد.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    } else {
                        Swal.update({
                            html: `
                                <h3>درحال دانلود...</h3>
                                <div class="progress mt-3" style="height: 20px;">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" 
                                         style="width: ${progress}%">
                                        ${progress}%
                                    </div>
                                </div>
                                <p class="mt-2">${title}</p>
                            `
                        });
                    }
                }, 200);
            }
        });
    });
    
    // 💌 فرم خبرنامه
    $('.btn-newsletter').click(function(e) {
        e.preventDefault();
        const email = $(this).siblings('input').val();
        
        if (!email || !email.includes('@')) {
            Swal.fire({
                title: 'خطا!',
                text: 'لطفاً یک ایمیل معتبر وارد کنید.',
                icon: 'error',
                confirmButtonText: 'باشه',
                background: '#161622',
                color: '#ffffff'
            });
            return;
        }
        
        Swal.fire({
            title: 'عضویت موفق!',
            text: `خبرنامه برای ${email} فعال شد.`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            background: '#161622',
            color: '#ffffff'
        });
        
        $(this).siblings('input').val('');
    });
    
    // 🎬 پخش ویدئو
    $('.play-btn').click(function() {
        const videoItem = $(this).closest('.side-video-item');
        const videoTitle = videoItem.find('h4').text();
        
        Swal.fire({
            title: videoTitle,
            html: `
                <div class="ratio ratio-16x9">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            title="${videoTitle}" 
                            allowfullscreen>
                    </iframe>
                </div>
                <p class="mt-3">درحال پخش ویدئو آموزشی...</p>
            `,
            width: '90%',
            background: '#161622',
            color: '#ffffff',
            showCloseButton: true,
            showConfirmButton: false
        });
    });
    
    // ❤️ لایک پست‌ها
    $('.post-like').click(function() {
        const likeBtn = $(this);
        const currentLikes = parseInt(likeBtn.text());
        const icon = likeBtn.find('i');
        
        if (icon.hasClass('fas')) {
            // لغو لایک
            likeBtn.html('<i class="far fa-heart"></i> ' + (currentLikes - 1));
            icon.removeClass('fas').addClass('far');
            likeBtn.css('color', '');
        } else {
            // لایک
            likeBtn.html('<i class="fas fa-heart"></i> ' + (currentLikes + 1));
            icon.removeClass('far').addClass('fas');
            likeBtn.css('color', '#ff003c');
        }
    });
    
    // 🔍 جستجو
    $('.btn-search').click(function(e) {
        e.preventDefault();
        const query = $(this).siblings('input').val().trim();
        
        if (query.length < 2) {
            Swal.fire({
                title: 'خطا!',
                text: 'لطفاً حداقل 2 حرف وارد کنید.',
                icon: 'warning',
                confirmButtonText: 'باشه',
                background: '#161622',
                color: '#ffffff'
            });
            return;
        }
        
        Swal.fire({
            title: 'نتایج جستجو',
            html: `
                <div class="text-start">
                    <h6>نتایج برای "${query}":</h6>
                    <ul class="search-results">
                        <li><a href="#">آموزش ${query} در کالاف</a></li>
                        <li><a href="#">بهترین تنظیمات ${query}</a></li>
                        <li><a href="#">اخبار مربوط به ${query}</a></li>
                        <li><a href="#">ویدئوهای ${query}</a></li>
                    </ul>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'مشاهده همه نتایج',
            showCancelButton: true,
            cancelButtonText: 'بستن',
            background: '#161622',
            color: '#ffffff',
            confirmButtonColor: '#00a8ff'
        });
    });
    
    // 🎲 انیمیشن‌های تصادفی
    function randomAnimations() {
        // تکان خوردن کارت‌ها
        setInterval(() => {
            $('.game-card').each(function() {
                if (Math.random() > 0.7) {
                    $(this).css('transform', 'translateY(-5px)');
                    setTimeout(() => {
                        $(this).css('transform', '');
                    }, 300);
                }
            });
        }, 3000);
        
        // تغییر رنگ پس‌زمینه آمار
        setInterval(() => {
            $('.stat-card').each(function() {
                const hue = Math.floor(Math.random() * 360);
                $(this).find('i').css('color', `hsl(${hue}, 100%, 50%)`);
            });
        }, 5000);
    }
    
    randomAnimations();
    
    // 🎯 اسکرول نرم
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        if (target === '#') return;
        
        $('html, body').animate({
            scrollTop: $(target).offset().top - 80
        }, 800);
    });
    
    // 📱 تشخیص دستگاه
    function detectDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            $('body').addClass('mobile-device');
            // بهینه‌سازی برای موبایل
            $('.game-stats').css('flex-direction', 'column');
            $('.game-stats span').css('margin-bottom', '5px');
        }
    }
    
    detectDevice();
    
    // 🎵 افکت‌های صوتی (اختیاری)
    function playSoundEffect(sound) {
        // می‌توانید فایل‌های صوتی اضافه کنید
        console.log(`Playing sound: ${sound}`);
    }
    
    // کلیک روی دکمه‌ها
    $('.btn-game, .btn-guide, .btn-download').click(function() {
        playSoundEffect('click');
    });
    
    // 🎨 تغییر تم
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    $(themeToggle).click(function() {
        $('body').toggleClass('light-theme');
        const icon = $(this).find('i');
        if ($('body').hasClass('light-theme')) {
            icon.removeClass('fa-moon').addClass('fa-sun');
            document.documentElement.style.setProperty('--primary-dark', '#f8f9fa');
            document.documentElement.style.setProperty('--text-primary', '#212529');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
            document.documentElement.style.setProperty('--primary-dark', '#0a0a0f');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
        }
    });
    
    // اضافه کردن استایل برای دکمه تغییر تم
    $('<style>').text(`
        .theme-toggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--accent-red);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(255, 0, 60, 0.3);
        }
        
        .light-theme {
            background-color: #f8f9fa;
            color: #212529;
        }
        
        .light-theme .game-card,
        .light-theme .news-card,
        .light-theme .stat-card,
        .light-theme .download-card,
        .light-theme .forum-post {
            background-color: #ffffff;
            border-color: #dee2e6;
        }
    `).appendTo('head');
    
    // 🎉 پیام خوش‌آمدگویی
    setTimeout(() => {
        Swal.fire({
            title: 'به GameLand خوش آمدید!',
            text: 'مرجع تخصصی بازی‌های موبایل',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
            background: '#161622',
            color: '#ffffff',
            toast: true,
            position: 'top-end'
        });
    }, 1000);
});
