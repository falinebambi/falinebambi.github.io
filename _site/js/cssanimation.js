/**
 * cssanimation
 *
 * Manipulates CSS classes on Documents to enable
 * writting animations with CSS.
 *
 * @author Â© 2014 yatah GmbH, Matthias Inauen
 */

$(document).ready(function(){
	if(Modernizr.touch){
		$('.cssAnimationTriggerMouseover, .cssAnimationTriggerMouseout, .cssAnimationTriggerHover').on( 'click', handleTouchOverOut);
	}
	else {
		$('.cssAnimationTriggerHover').hover( handleRollOver, handleRollOut);
		$('.cssAnimationTriggerMouseover').on( 'mouseover', handleRollOver);
		$('.cssAnimationTriggerMouseout').on( 'mouseout', handleRollOut);		
	}

	$('.cssAnimationTriggerClick').on('click', handleClick);
	$('.cssAnimationTriggerClickToggle').on('click', handleClickToggle);

	function handleTouchOverOut() {
		console.log("handleTouchOverOut $(this).hasClass('.cssAnimationRollOver')", $(this).hasClass('.cssAnimationRollOver'))
		if($(this).hasClass('cssAnimationRollOver')){
			setAnimation( $(this),'cssAnimationRollOut','cssAnimationRollOver', true);
		}
		else {
			setAnimation( $(this),'cssAnimationRollOver','cssAnimationRollOut');
		}
	}

	function handleRollOver() {
		setAnimation( $(this),'cssAnimationRollOver','cssAnimationRollOut');
	}

	function handleRollOut() {
		setAnimation( $(this),'cssAnimationRollOut','cssAnimationRollOver');
	}

	function handleClick() {
		setAnimation( $(this),'cssAnimationClick',undefined,true);
	}

	function handleClickToggle() {
		if($(this).hasClass('cssAnimationClickIn')) {
			setAnimation( $(this),'cssAnimationClickOut','cssAnimationClickIn',true);	
		}
		else {
			setAnimation( $(this),'cssAnimationClickIn','cssAnimationClickOut');	
		}
	}

	function setAnimation(origin, addClass, removeClass, handleAnimationEnd) {
		var dependableArray = getDependablesFromClassName(origin, addClass);
		setItemClasses( origin, addClass, removeClass, handleAnimationEnd );


		if( dependableArray && dependableArray.length > 0 ){
			for(var i = 0; i < dependableArray.length; i++) {
				setItemClasses( $(dependableArray[i]), addClass, removeClass, handleAnimationEnd );
			}
		}
	}

	function setItemClasses( item, addClass, removeClass, handleAnimationEnd ){
		if( typeof(removeClass) !== 'undefined' || removeClass !== '') {
			item.removeClass(removeClass);
		}

		if( typeof(addClass) !== 'undefined' || addClass !== '') {
			item.addClass(addClass);
		}

		if( handleAnimationEnd ) {
			addHandleAnimationEnded( item, addClass );
		}
	}

	function addHandleAnimationEnded( item, removeClass ){
		item.on('animationend webkitAnimationEnd transitionend webkitTransitionEnd', function(){
			handleAnimationEnded( $(this), removeClass );
		});
	}

	function handleAnimationEnded( item, removeClass ) {
		if(typeof(removeClass) !== 'undefined') {
			item.removeClass(removeClass);
		}

		item.off('animationend webkitAnimationEnd transitionend webkitTransitionEnd');
	}

	function getDependablesFromClassName( origin, addClass ) {
		var dependableName,
			data;

		if( addClass.toLowerCase().indexOf('clickin') > -1 || addClass.toLowerCase().indexOf('clickout') > -1){
			dependableName = 'dependable-clicktoggle';
		}
		else if( addClass.toLowerCase().indexOf('click') > -1 ){
			dependableName = 'dependable-click';
		}
		else if(addClass.toLowerCase().indexOf('hover') > -1) {
			dependableName = 'dependable-hover';
		}
		else if(addClass.toLowerCase().indexOf('rollover') > -1) {
			dependableName = 'dependable-mouseover';
		}
		else if(addClass.toLowerCase().indexOf('rollout') > -1) {
			dependableName = 'dependable-mouseout';
		}

		data = origin.attr('data-'+dependableName);
		if( data && typeof(data) !== 'undefined' ){
			return data.split(',')
		}
		return null;
	}
});