//admin.js
//DELETE an item from list on admin/list page

$(function() {
	$('.del').click(function (e) {
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)

		console.log('ID=' + id)
		console.log('TR=' + tr.toString())

		$.ajax({
			type: 'DELETE',
			url: '/admin/card/list?id=' +  id
		})
		.done(function (results) {

			console.log('admin.js results.success=' + results.success)

			if (results.success === 1) {
				if (tr.length > 0) {
					tr.remove()
				}
			}
		})
	})
})