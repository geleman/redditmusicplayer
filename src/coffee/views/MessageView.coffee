
Templates = require 'Templates'
Constants = require 'Constants'
Dispatcher = require('Util').Dispatcher
Messages = require 'collections/Messages'



MessageView = Backbone.View.extend
	template: Templates.MessageView
	events:
		'click .buttons .button': 'click'

	click: (e) ->
		message = Messages.get $(e.currentTarget).parents('.message').data 'id'
		return if not message?

		clickedButton = message.buttons[$(e.currentTarget).data 'id']
		return if not clickedButton?
		@close(e) if clickedButton.action is 'close'
		clickedButton.callback() if clickedButton.callback?

	close: (e) ->
		Messages.remove $(e.currentTarget).parents('.message').data 'id'

	repeat: (msg) ->
		@$(".message[data-id=#{msg.cid}]").transition 'shake'

	add: (msg) ->
		@$el.addClass 'active'
		$msg = $ @template msg
		@$el.append $msg
		if msg.type is 'error'
			$msg.transition 'shake'
		else
			$msg.transition 'fly up in'

	remove: (msg) ->
		@$(".message[data-id=#{msg.cid}]").remove()
		@$el.removeClass 'active'

	initialize: () ->
		@listenTo Messages, 'add', @add
		@listenTo Messages, 'remove', @remove
		@listenTo Dispatcher, Constants.MESSAGE_REPEAT, @repeat



module.exports = MessageView
