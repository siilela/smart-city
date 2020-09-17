controller.removeAnimClasses = function (index, css) {
	return (css.match (/(^|\s)anim_\S+/g) || []).join(' ');
}

