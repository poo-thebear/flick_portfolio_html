// Portfolio Section Start
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 600) {
        const gridVideos = document.querySelectorAll('.grid-video');
        gridVideos.forEach(video => {
            const player = new Plyr(video, { muted: true, autoplay: false, controls: false });

            // Add play on hover functionality
            video.addEventListener('mouseover', () => {
                player.play();
            });

            video.addEventListener('mouseout', () => {
                player.pause();
            });
        });
    }
    const gridItems = document.querySelectorAll('.grid-item');
    const overlay = document.querySelector('.overlay');
    const contextText = overlay.querySelector('.context-text');
    const mediaContainer = overlay.querySelector('.media-container');
    const closeOverlayButton = overlay.querySelector('.close-overlay-button');

    let player = new Plyr(overlay.querySelector('video'));

    gridItems.forEach((gridItem) => {
        const imgOrVideo = gridItem.querySelector('img, video').cloneNode(true);
        gridItem.addEventListener('click', () => {
            mediaContainer.innerHTML = ''; // Clear previous content
            mediaContainer.appendChild(imgOrVideo);
            contextText.innerHTML = gridItem.dataset.context;
            imgOrVideo.style.height = "80vh";
            imgOrVideo.style.width = "100%";
            overlay.classList.add('active');
            overlay.style.visibility = 'visible'; // Show the overlay on click

            // Check if it's a video and add controls
            if (imgOrVideo.tagName === 'VIDEO') {
                setTimeout(() => {
                    player.source = {
                        type: 'video',
                        sources: [
                            {
                                src: imgOrVideo.src,
                                type: 'video/mp4',
                            },
                        ],
                    };
                    imgOrVideo.controls = true;
                    imgOrVideo.autoplay = true;
                    imgOrVideo.muted = false;
                    imgOrVideo.volume=0.5;
                    imgOrVideo.play();
                }, 0);
            }
            closeOverlayButton.addEventListener('click', () => {
                overlay.classList.remove('active');
                if (imgOrVideo.tagName == 'VIDEO') {
                    imgOrVideo.pause();
                }

                overlay.style.visibility = 'hidden';


            });
        });

    });
    const gridContainer = document.querySelector('.grid-container');
    const imagesBtn = document.getElementById('imagesBtn');
    const videosBtn = document.getElementById('videosBtn');
    const allBtn = document.getElementById('allBtn');

    imagesBtn.addEventListener('click', () => {
        gridContainer.style.opacity = 0;
        imagesBtn.style.borderBottom= '1px solid #ccc';
        videosBtn.style.borderBottom= 'none';
        allBtn.style.borderBottom= 'none';
        setTimeout(() => {
            filterGridItems('image');
            gridContainer.style.opacity = 1;
        }, 300);
    });

    videosBtn.addEventListener('click', () => {
        gridContainer.style.opacity = 0;
        imagesBtn.style.borderBottom= 'none';
        videosBtn.style.borderBottom= '1px solid #ccc';
        allBtn.style.borderBottom= 'none';
        setTimeout(() => {
            filterGridItems('video');
            gridContainer.style.opacity = 1;
        }, 300);
    });

    allBtn.addEventListener('click', () => {
        gridContainer.style.opacity = 0;
        imagesBtn.style.borderBottom= 'none';
        videosBtn.style.borderBottom= 'none';
        allBtn.style.borderBottom= '1px solid #ccc';
        setTimeout(() => {
            filterGridItems('all');
            gridContainer.style.opacity = 1;
        }, 300);
    });

    function filterGridItems(dataType) {
        gridItems.forEach((gridItem) => {
            const itemDataType = gridItem.classList.contains('video-item') ? 'video' : 'image';

            if (dataType === 'all' || itemDataType === dataType) {
                gridItem.style.display = 'block';
            } else {
                gridItem.style.display = 'none';
            }
        });
    }

});// Portfolio Section Close


(function ($) {
    
	"use strict";

	var cfg = {		
		defAnimation   : "fadeInUp",    // default css animation		
		scrollDuration : 800,           // smoothscroll duration
    },	
    $WIN = $(window);


    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
    /* Menu on Scrolldown
         * ------------------------------------------------------ */
    var ssMenuOnScrolldown = function () {

        var menuTrigger = $('#header-menu-trigger');

        $WIN.on('scroll', function () {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


    /* OffCanvas Menu
   * ------------------------------------------------------ */
    var ssOffCanvas = function () {

        var menuTrigger = $('#header-menu-trigger'),
            nav = $('#menu-nav-wrap'),
            closeButton = nav.find('.close-button'),
            siteBody = $('body'),
            mainContents = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function (e) {
            e.preventDefault();
            menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function (e) {
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function (e) {
            if (!$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span')) {
                menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });

    };


    /* Smooth Scrolling
    * ------------------------------------------------------ */
    var ssli_link = function () {

        $('.li_link').on('click', function (e) {
            var target = this.hash,
                $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('#header-menu-trigger').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };

    (function ssInit() {
		ssMenuOnScrolldown();
		ssOffCanvas();
		ssli_link();

	})();
})(jQuery);