jQuery_T4NT(document).ready(function ($) {

	/**
	*  Variant selection changed
	*  data-variant-toggle="{{ variant.id }}"
	*/
	$(document).on("variant:changed", function (evt) {
		// console.log( evt.currentVariant );
		// $('[data-variant-toggle]').hide(0);
		// $('[data-variant-toggle="'+evt.currentVariant.id+'"]').show(0);
	});


});


// Header SearchBar and Type Animation 

document.addEventListener('shopify:section:load', function () {
	initializeTypeWriterEffect();
});

document.addEventListener('DOMContentLoaded', function () {
	initializeTypeWriterEffect();



	$('.t4s-mini-search__input, .t4s-search-header__input').focusin(function () {
		$('body').addClass('focused-search');
		$('button.t4s-search-header__submit').addClass('clear-search');
	});

	$(document).on('click', '.clear-search svg.close-icon', function () {
		$('.t4s-mini-search__input, .t4s-search-header__input ').val('');
		$('body').removeClass('focused-search');
		$('button.t4s-search-header__submit').removeClass('clear-search');

	});

	$(document).on('click', '.t4s-push-menu-btn', function () {
		$('body').addClass('menu-overlay');
	});

	$(document).on('click', '.t4s-drawer-menu__close', function () {
		$('body').removeClass('menu-overlay');
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 450.8) {
			$('body').addClass('newClass');
		} else {
			$('body').removeClass('newClass');
		}
	});
});

// Delay for 1 second (1000ms)

function initializeTypeWriterEffect() {
  // Cancel any previous instances
  if (window.typewriterTimers) {
    window.typewriterTimers.forEach(timer => clearTimeout(timer));
  }
  window.typewriterTimers = [];
  
  // Get the input elements
  const inputs = [
    document.querySelector('.t4s-search-header__input'),
    document.querySelector('.t4s-mini-search__input'),
  ].filter(input => input !== null);
  
  if (inputs.length === 0) return; // No valid inputs found
  
  const baseText = 'Search for: ';
 const textList = ['Mystery Box', 'Nascar Jacket', 'T-shirt', 'Jeans'];
  
  // Setup each input element
  inputs.forEach(input => {
    let state = {
    textIndex: 0,
    charIndex: 0,
    isDeleting: false,
    active: true
    };
    
    // Reset placeholder
    input.setAttribute('placeholder', baseText);
    
    // Create non-recursive animation function
    function animate() {
    if (!state.active) return;
    
    const currentText = textList[state.textIndex];
    
    if (!state.isDeleting) {
      // Typing forward
      if (state.charIndex <= currentText.length) {
      input.setAttribute('placeholder', baseText + currentText.substring(0, state.charIndex));
      state.charIndex++;
      
      if (state.charIndex <= currentText.length) {
        // Continue typing
        const timer = setTimeout(animate, 100);
        window.typewriterTimers.push(timer);
      } else {
        // Done typing, pause before deleting
        const timer = setTimeout(() => {
        if (state.active) {
          state.isDeleting = true;
          animate();
        }
        }, 2000);
        window.typewriterTimers.push(timer);
      }
      }
    } else {
      // Deleting
      if (state.charIndex >= 0) {
      input.setAttribute('placeholder', baseText + currentText.substring(0, state.charIndex));
      state.charIndex--;
      
      if (state.charIndex >= 0) {
        // Continue deleting
        const timer = setTimeout(animate, 50);
        window.typewriterTimers.push(timer);
      } else {
        // Done deleting, move to next text
        state.isDeleting = false;
        state.textIndex = (state.textIndex + 1) % textList.length;
        state.charIndex = 0;
        
        // Small pause before starting next word
        const timer = setTimeout(animate, 300);
        window.typewriterTimers.push(timer);
      }
      }
    }
    }
    
    // Handle input focus
    input.addEventListener('focus', function() {
    state.active = false;
    this.setAttribute('placeholder', '');
    });
    
    // Handle input blur
    input.addEventListener('blur', function() {
    if (this.value === '') {
      state.active = true;
      state.isDeleting = false;
      state.charIndex = 0;
      animate();
    }
    });
    
    // Start animation
    animate();
  });
  }
  
  // Call the function when the document is ready
  document.addEventListener('DOMContentLoaded', initializeTypeWriterEffect);


// Custom Title in Recommendations Products

const intervalId = setInterval(function () {
	// Get the custom heading and its HTML content
	const customHeading = document.querySelector('.custom-heading');
	const customHeadingHTML = customHeading ? customHeading.innerHTML.trim() : '';

	// Get the dynamic link from the custom heading (assuming it's rendered by Liquid)
	const dynamicLinkElement = document.querySelector('.custom-view-link'); // Select the anchor with class "custom-view-link"
	const dynamicHref = dynamicLinkElement ? dynamicLinkElement.href : '#'; // Extract the dynamic href

	// Find the target h3 element where the HTML will be replaced
	const targetHeading = document.querySelector(
		'.shopify-section.t4s-section.id_product-recommendations h3.t4s-section-title.t4s-title'
	);
	const targetHeadingnew = document.querySelector(
		'.shopify-section.t4s-section.id_product-recommendations button.flickityt4s-button.flickityt4s-prev-next-button.next'
	);
	// Check if both elements exist and the customHeadingHTML has content
	if (targetHeading && customHeadingHTML.length > 0) {
		// Replace the target h3 element's content with the custom heading HTML
		targetHeading.innerHTML = customHeadingHTML;

		// Create the new anchor element
		const anchor = document.createElement('a');
		anchor.href = dynamicHref; // Use the dynamically extracted href
		anchor.className =
			'custom-view-link-bew t4s-btn-base t4s-btn-size-large t4s-btn-color-primary t4s-btn-effect-default t4s-btn';
		anchor.textContent = 'View All'; // Anchor text

		// Append the anchor to the targetHeading
		targetHeadingnew.insertAdjacentElement('afterend', anchor);

		// Stop the interval after updating the target
		clearInterval(intervalId);
	}
}, 1000); // Check every 1 second

document.addEventListener('click', function (event) {
	if (event.target.classList.contains('cc-btn-decision')) {
		setTimeout(function () {
			document.body.classList.add('removecookies');
		}, 500); // 500 milliseconds delay
	}
});




// Sticky collection

let lastScrollTop = 500;
const body = document.body;

window.addEventListener("scroll", () => {
	const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

	if (currentScrollTop < lastScrollTop) {
		// Scrolling up
		body.classList.add("scroll-up");
	} else {
		// Scrolling down
		body.classList.remove("scroll-up");
	}

	lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Ensure it doesn't go negative
});


// Make Title Dynamic

let interval = setInterval(function () {
	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);

	const size = params.get('filter_size') || '';
	const type = params.get('filter_product_type') || '';
	const brand = params.get('filter_brand') || '';

	const title = `${brand || ''} ${type || ''}`.trim();

	if (title) {
		const collectionTitleElement = document.querySelector('.collectionname h2');
		if (collectionTitleElement) {
			collectionTitleElement.textContent = title;
		}
		clearInterval(interval);
	}
}, 100);


// Current Menu JS

var path = window.location.pathname;

// Create a function to check and update the menu items
function updateMenuLinks() {
	var links = document.querySelectorAll("#t4s-menu-drawer .t4s-menu-item a");
	if (links.length > 0) {
		links.forEach(function (link) {
			if (link.getAttribute("href") === path) {
				link.parentElement.classList.add("mobile-menu_current"); // Add the class
			}
		});
	}
}

// Create a MutationObserver to monitor DOM changes
var observer = new MutationObserver(function (mutationsList, observer) {
	for (var mutation of mutationsList) {
		if (mutation.type === "childList") {
			updateMenuLinks(); // Call the update function whenever the DOM changes
		}
	}
});

// Start observing the body or a specific container
observer.observe(document.body, {
	childList: true, // Monitor direct children
	subtree: true,   // Monitor all descendants
});

// Optionally, call the function immediately if the menu is already loaded
updateMenuLinks();



document.addEventListener('DOMContentLoaded', function() {
	// Initial setup
	setupVideoCarouselAutoplay();
	
	// Also run again after a short delay to catch elements that might load dynamically
	setTimeout(setupVideoCarouselAutoplay, 1000);
	
	// For single-page applications or sites with dynamic content loading,
	// you might need to run this function after content updates
  });
  
  // Main function to set up the auto-play functionality
  function setupVideoCarouselAutoplay() {
	console.log('Setting up video carousel autoplay...');
	
	// Find all video items in the carousel
	const videoItems = document.querySelectorAll('.t4s-col-item.t4s-carousel__nav-item[data-mdtype="video"]');
	console.log(`Found ${videoItems.length} video items`);
	
	videoItems.forEach((item, index) => {
	  // Check if we already added a listener to avoid duplicates
	  if (!item.hasAttribute('data-video-listener')) {
		console.log(`Binding click to video item #${index}`);
		
		item.setAttribute('data-video-listener', 'true');
		
		item.addEventListener('click', function() {
		  console.log(`Clicked video item #${index}`);
		  
		  // Use multiple attempts with increasing delays to handle different loading scenarios
		  tryClickPlayButton(0);
		  
		  function tryClickPlayButton(attempt) {
			if (attempt >= 5) return; // Give up after 5 attempts
			
			setTimeout(() => {
			  const playButton = document.querySelector('.plyr__control--overlaid');
			  
			  if (playButton) {
				console.log(`Attempt ${attempt + 1}: Found play button`);
				
				if (playButton.offsetParent !== null) {
				  console.log('Play button is visible — clicking');
				  playButton.click();
				} else {
				  console.log('Play button is hidden, trying again...');
				  tryClickPlayButton(attempt + 1);
				}
			  } else {
				console.log(`Attempt ${attempt + 1}: Play button NOT found, trying again...`);
				tryClickPlayButton(attempt + 1);
			  }
			}, 300 * (attempt + 1)); // Increasing delay for each attempt
		  }
		});
	  }
	});
  
	// For carousels that might be added dynamically later
	// Setup a mutation observer to detect when new carousel items are added
	setupMutationObserver();
  }
  
  // Set up a MutationObserver to catch dynamically added carousel items
  function setupMutationObserver() {
	// Check if observer already exists
	if (window.videoCarouselObserver) return;
	
	const observerConfig = { 
	  childList: true, 
	  subtree: true 
	};
	
	window.videoCarouselObserver = new MutationObserver(function(mutations) {
	  let shouldSetup = false;
	  
	  mutations.forEach(function(mutation) {
		// Check if any new nodes were added
		if (mutation.addedNodes.length) {
		  for (let i = 0; i < mutation.addedNodes.length; i++) {
			const node = mutation.addedNodes[i];
			// Check if it's an element and might contain our carousel items
			if (node.nodeType === Node.ELEMENT_NODE) {
			  if (node.querySelector('.t4s-carousel__nav-item[data-mdtype="video"]') || 
				  node.matches('.t4s-carousel__nav-item[data-mdtype="video"]')) {
				shouldSetup = true;
				break;
			  }
			}
		  }
		}
	  });
	  
	  if (shouldSetup) {
		console.log('New carousel elements detected, setting up listeners...');
		setupVideoCarouselAutoplay();
	  }
	});
	
	// Start observing the document body for changes
	window.videoCarouselObserver.observe(document.body, observerConfig);
  }


// Function to check if infinite scroll has ended
function checkInfiniteScrollEnd() {
  const paginationWrapper = document.querySelector('[data-wrap-lm]');
  const body = document.body;
  
  if (paginationWrapper) {
    const isHidden = window.getComputedStyle(paginationWrapper).display === 'none';
    
    if (isHidden) {
      // Pagination wrapper is hidden (display: none), add the class
      if (!body.classList.contains('infinite_ended')) {
        body.classList.add('infinite_ended');
        // alert('Infinite scroll has ended - no more products to load!');
      }
    } else {
      // Pagination wrapper is visible, remove the class
      body.classList.remove('infinite_ended');
    }
  } else {
    // Pagination wrapper doesn't exist at all, also add the class
    if (!body.classList.contains('infinite_ended')) {
      body.classList.add('infinite_ended');
      // alert('Infinite scroll has ended - no more products to load!');
    }
  }
}

// Monitor for style changes on the pagination wrapper
function monitorPaginationWrapper() {
  const paginationWrapper = document.querySelector('[data-wrap-lm]');
  if (paginationWrapper) {
    // Create observer to watch for style attribute changes
    const styleObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
          checkInfiniteScrollEnd();
        }
      });
    });
    
    styleObserver.observe(paginationWrapper, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }
}

// Monitor AJAX requests completion
function monitorAjaxRequests() {
  // Override fetch function to monitor AJAX calls
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    return originalFetch.apply(this, args)
      .then(response => {
        // Check for infinite scroll end after AJAX completes
        setTimeout(checkInfiniteScrollEnd, 500);
        return response;
      });
  };

  // Override XMLHttpRequest for jQuery AJAX calls
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    this.addEventListener('load', function() {
      // Check for infinite scroll end after AJAX completes
      setTimeout(checkInfiniteScrollEnd, 500);
    });
    originalOpen.apply(this, arguments);
  };
}

// Watch for DOM changes
function watchDOMChanges() {
  const domObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        // Re-monitor pagination wrapper if DOM changes
        setTimeout(() => {
          monitorPaginationWrapper();
          checkInfiniteScrollEnd();
        }, 100);
      }
    });
  });
  
  domObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Listen for Shopify/Kalles specific events
function listenForThemeEvents() {
  // Common Shopify theme events
  document.addEventListener('shopify:section:load', () => {
    setTimeout(() => {
      monitorPaginationWrapper();
      checkInfiniteScrollEnd();
    }, 300);
  });
  
  // Kalles theme custom events
  document.addEventListener('kalles:collection:loaded', () => {
    setTimeout(checkInfiniteScrollEnd, 300);
  });
  
  // Listen for collection updates
  document.addEventListener('collection:updated', () => {
    setTimeout(checkInfiniteScrollEnd, 300);
  });
}

// Initialize everything
function init() {
  checkInfiniteScrollEnd();
  monitorPaginationWrapper();
  monitorAjaxRequests();
  watchDOMChanges();
  listenForThemeEvents();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Also check periodically as fallback
setInterval(checkInfiniteScrollEnd, 2000);



function addPopupProductToCart() {
  console.log('Starting addPopupProductToCart function');


  
  const checkoutButton = document.querySelector('button[name="checkout"]');
          

  fetch('/products/sleeve-patch.js') // Fetch popup product details
    .then(response => response.json())
    .then(product => {
      console.log('Popup product fetched:', product);
      const variantId = product.variants.length > 0 ? product.variants[0].id : null;

      if (!variantId) {
        console.error('No available variants for this product.');
        return;
      }

      fetch('/cart.js')
  .then(response => response.json())
  .then(cart => {
    console.log('Cart fetched:', cart);

    // Exit early if popup product is already in the cart
    const popupInCart = cart.items.some(item => item.variant_id == variantId);
    if (popupInCart) {
      console.log('Popup product already in cart, skipping logic');
      hideLoader();
      const checkoutButton = document.querySelector('button[name="checkout"]');
      // if (checkoutButton) {
      //        checkoutButton.click();
      //     }
    
    
    //   checkoutButton.setAttribute('handpick-terms', 'false');

    //   checkoutButton.addEventListener("click", function (e) {
    //         if (checkoutButton.getAttribute("handpick-terms") === "false") {
    //             e.preventDefault(); // Prevent form submission
    //             showFirstPopup();
    //         }
    //     });

    // showFirstPopup();

    checkoutButton.removeAttribute('handpick-terms');

     

    const checkbox = document.getElementById('tcs_checkbox');
            if (checkbox) {
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event('change')); // if needed
            }

            checkoutButton.addEventListener("click", function (e) {
              if (checkoutButton.getAttribute("handpick-terms") === "false") {
                  e.preventDefault(); // Prevent form submission
                  // document.getElementById('tcs_checkbox').click();
                  showFirstPopup();
              }
          });

      return;
    }

    const itemPromises = cart.items.map(item => {
      console.log('Processing cart item:', item);

      

      return fetch(`/products/${item.handle}.js`)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to fetch product data for ${item.handle}`);
          return res.json();
        })
        .then(productData => {
          const isBale = typeof productData.type === 'string' &&
                         productData.type.toLowerCase() === 'bale';
                         
          const isResellerBundle = typeof productData.type === 'string' &&
                         productData.type.toLowerCase() === 'reseller bundle';

          const isHandpick = Array.isArray(productData.tags) &&
                             productData.tags.some(tag => 
                               typeof tag === 'string' && tag.toLowerCase() === 'handpick'
                             );

          // Extract the number from the product title using a regular expression
          const titleNumber = productData.title.match(/\d+/);
          const extractedNumber = titleNumber ? parseInt(titleNumber[0]) : 0; // Convert to integer

          return {
            item: item,
            productData: productData,
            isHandpick: isHandpick,
            isBale: isBale,
            isResellerBundle: isResellerBundle,
            extractedNumber: extractedNumber // Use this for both Bale and Reseller Bundle
          };
        })
        .catch(error => {
          console.error(`Error fetching product data for ${item.handle}:`, error);
          return {
            item: item,
            productData: null,
            isHandpick: false,
            isBale: false,
            isResellerBundle: false,
            extractedNumber: 0
          };
        });
    });

    Promise.all(itemPromises)
      .then(itemsWithData => {
        let regularItemsQuantity = 0;
        let quantityFromNumberedTypes = 0;

        itemsWithData.forEach(data => {
          if (data.isBale || data.isResellerBundle) {
            // Handle both Bale and Reseller Bundle the same way
            const contribution = data.item.quantity * data.extractedNumber;
            quantityFromNumberedTypes += contribution;
            console.log(`${data.isBale ? 'Bale' : 'Reseller Bundle'} item: ${data.item.title}, quantity: ${data.item.quantity}, number from title: ${data.extractedNumber}, contribution: ${contribution}`);
          } else if (data.isHandpick) {
            regularItemsQuantity += data.item.quantity;
            console.log(`Handpick item: ${data.item.title}, quantity: ${data.item.quantity}`);
          }
        });

        const totalQuantityToAdd = quantityFromNumberedTypes + regularItemsQuantity;
        if (totalQuantityToAdd <= 0) {
          console.log('No qualifying items found (handpick, bale, or reseller bundle), skipping popup addition');
          return;
        }

        console.log(`Adding popup product (variant ID: ${variantId}), quantity: ${totalQuantityToAdd}`);

       

        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: variantId, quantity: totalQuantityToAdd }] })
        })
        .then(response => {
          if (!response.ok) throw new Error(`Failed to add item to cart: ${response.status}`);
          return response.json();
        })
        .then(addResult => {
          console.log('Popup product added successfully:', addResult);

          const checkoutButton = document.querySelector('button[name="checkout"]');

          // if (checkoutButton) {
          //    checkoutButton.click();
          // }

          hideLoader();

          // checkoutButton.setAttribute('handpick-terms', 'false');

          checkoutButton.removeAttribute('handpick-terms');

        //   checkoutButton.addEventListener("click", function (e) {
        //     if (checkoutButton.getAttribute("handpick-terms") === "false") {
        //         e.preventDefault(); // Prevent form submission
        //         showFirstPopup();
        //     }
        // });

        // showFirstPopup();

        // checkoutButton.removeAttribute('handpick-terms');

        const checkbox = document.getElementById('tcs_checkbox');
            if (checkbox) {
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event('change')); // if needed
            }

            checkoutButton.addEventListener("click", function (e) {
              if (checkoutButton.getAttribute("handpick-terms") === "false") {
                  e.preventDefault(); // Prevent form submission
                  // document.getElementById('tcs_checkbox').click();
                  showFirstPopup();
              }
          });


         
          jQuery.getJSON('/cart.js', function(updatedCart) {
            document.dispatchEvent(new CustomEvent('cart:build', { bubbles: true }));
            document.dispatchEvent(new CustomEvent('cart:refresh', {
              bubbles: true,
              detail: updatedCart.items
            }));
          });
        })
        .catch(error => console.error('Error adding popup product:', error));
      });
  })
  .catch(error => console.error('Error fetching cart:', error));

    })
    .catch(error => console.error('Error fetching popup product:', error));
}







