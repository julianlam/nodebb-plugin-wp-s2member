<form role="form" class="wp-paidmembershipspro-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">Connection</div>
		<div class="col-sm-10 col-xs-12">
			<p class="lead">
				In order to properly connect with Paid Memberships Pro, we&apos;ll need access to your
				administrative account, as well as requisite XML-RPC connection details.
			</p>
			<div class="form-group">
				<label for="adminuser">Username</label>
				<input type="text" id="adminuser" name="adminuser" title="Username" class="form-control" placeholder="Username">
			</div>
			<div class="form-group">
				<label for="adminpass">Password</label>
				<input type="password" id="adminpass" name="adminpass" title="Password" class="form-control" placeholder="Password">
			</div>
			<div class="form-group">
				<label for="host">XML-RPC Host</label>
				<input type="text" id="host" name="host" title="XML-RPC Host" class="form-control" placeholder="example.org">
			</div>
			<div class="form-group">
				<label for="port">XML-RPC Port</label>
				<input type="text" id="port" name="port" title="XML-RPC Port" class="form-control" placeholder="80">
			</div>
			<div class="form-group">
				<label for="path">XML-RPC Path</label>
				<input type="text" id="path" name="path" title="XML-RPC Path" class="form-control" placeholder="/xmlrpc.php">
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>