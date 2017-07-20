<?php
	$t = isset($_GET['t']) ? $_GET['t'] : 'num';
	$callback = isset($_GET['callback']) ? $_GET['callback'] : 'fn1';
	$arr1 = array('1111','22222','33333','444444','555555555555555555');
	$arr2 = array('aaaa','bbbbbb','ccccccc','ddddddd','eeeeeeeeeeeeee');

	if( $t == 'num'){
		$data = json_encode($arr1);
	}else{
		$data = json_encode($arr2);
	}

	echo $callback.'('.$data.')';
?>