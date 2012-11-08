describe("jQuery scrollOut should ", function() {

	var $viewport, $scroller, $lastItem, $firstItem, $secondItem, $sixthItem, itemHeight = 50;

	beforeEach(function() {
		$viewport = $('#viewport');
		$scroller = $('#scroller');
		$firstItem = $scroller.find('li').first()
		$secondItem = $firstItem.next();
		$sixthItem = $scroller.find('li').eq(5);
		$seventhItem = $scroller.find('li').eq(6);
		$lastItem = $scroller.find('li').last();

		$viewport.animate( { "scrollLeft" : 0, "scrollTop" : 0 }, 0 );
	});

	it("exist", function() {
		expect( $.fn.scrolledOut ).toBeDefined();
		expect( $viewport.scrolledOut ).toBeDefined();
	});

	it("always return an object", function() {
		expect( $firstItem.scrolledOut( $viewport ) ).toEqual( jasmine.any(Object) );
	})

	describe("return how many pixels an item is hidden by", function() {

		it ( "on the top", function() {

			var offset = itemHeight * 0.5
			$viewport.animate( { "scrollTop" : itemHeight + offset }, 0 );

			expect( $firstItem.scrolledOut( $viewport ).top ).toEqual( itemHeight + offset )
			expect( $secondItem.scrolledOut( $viewport ).top ).toEqual( offset )

		})

		it ( "on the bottom", function() {

			var offset = itemHeight * 0.5
			$viewport.animate( { "scrollTop" : itemHeight + offset }, 0 );		

			expect( $sixthItem.scrolledOut( $viewport ).bottom ).toEqual( offset )
			expect( $seventhItem.scrolledOut( $viewport ).bottom ).toEqual( itemHeight + offset )

		})

		it( "on the left side", function() {

			$viewport.animate( { "scrollLeft" : 50 }, 0 );	
			expect( $sixthItem.scrolledOut( $viewport ).left ).toEqual( 50 );

		});

		it( "on the right side", function() {

			expect( $sixthItem.scrolledOut( $viewport ).right ).toEqual( $firstItem.width() - $viewport.width() );
			
		});

		it( "on multiple sides at once (top, bottom, left, right)", function() {

			var scrolledOut;

			$viewport.height( 25 ).animate({ "scrollTop" : 5, "scrollLeft" : 50 }, 0);

			scrolledOut = $firstItem.scrolledOut( $viewport );

			expect( scrolledOut.top ).toEqual( 5 )
			expect( scrolledOut.bottom ).toEqual( 20 )
			expect( scrolledOut.left ).toEqual( 50 )
			expect( scrolledOut.right ).toEqual( ( $firstItem.width() - $viewport.width() ) - 50 )

			$viewport.attr( 'style', '' ).animate({ "scrollTop" : 0, "scrollLeft" : 0 }, 0);

		});

	});

});