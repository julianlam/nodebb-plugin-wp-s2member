<form role="form" class="wp-s2member-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">Connection</div>
		<div class="col-sm-10 col-xs-12">
			<p class="lead">
				In order to properly connect with the s2Member plugin, we&apos;ll need the API key for remote access.
			</p>
			<div class="form-group">
				<label for="key">API Key</label>
				<input type="text" id="key" name="key" title="API Key" class="form-control" placeholder="API Key">
			</div>
			<div class="form-group">
				<label for="url">URL to Wordpress</label>
				<input type="text" id="url" name="url" title="URL to Wordpress" class="form-control" placeholder="http://...">
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>