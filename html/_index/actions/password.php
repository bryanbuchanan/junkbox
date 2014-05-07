<html>
<body>

	<form action="#" method="post">
		<input type="text" name="encode" size="25" placeholder="password">
		<input type="submit" value="Encode">
	</form>

	<? if (isset($_POST['encode'])): ?>
		<input type="text" size="50" value="<?= md5($_POST['encode']) ?>">
	<? endif ?>

</body>
</html>