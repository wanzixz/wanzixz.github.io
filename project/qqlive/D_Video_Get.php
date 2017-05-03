<?php

include "../Redis_my.php";
$jss=new D_Video_Get();

if($_GET['type']=='resetAll')
	$jss->resetAll();
else if($_GET['type']=='setData')
	$jss->setData();
else if($_GET['type']=='getAll')
	$jss->getAll();

class D_Video_Get
{
	public $name="_QQLive";
	//获取总数
    public function getAll(){

		$redis = new Redis_my();

        $redis->hostname = "10.104.246.23";
        // $redis->password = "";
        $redis->database = 0;
        $redis->port = 6639;

		$data['load_time'.$this->name]=$redis->get('load_time'.$this->name);
		$list['H5浏览量']=$data['load_time'.$this->name]==null?0:$data['load_time'.$this->name];

		foreach($list as $key => $val){
			echo $key.':'.$val.'</br></br>';
		}
    }

    //重设
    public function setData(){

		$redis = new Redis_my();

        $redis->hostname = "10.104.246.23";
        $redis->database = 0;
        $redis->port = 6639;

		$redis->set('load_time'.$this->name,0);

		echo 'ok';
    }

	//重设
    public function resetAll(){

		$redis = new Redis_my();

        $redis->hostname = "10.104.246.23";
        $redis->database = 0;
        $redis->port = 6639;

		$redis->set('ticket',0);
		$redis->set('tickettime',0);
		$redis->set('accesstoken',0);
		$redis->set('tokenticket',0);

		echo 'ok';
    }

}


?>
