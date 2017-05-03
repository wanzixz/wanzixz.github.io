<?php

include "../Redis_my.php";
$jss=new D_Video();

$jss->share_data($_POST['url']);



class D_Video
{
	public $appId = "wx06441a33a2a67de4";
    public $appSecret = "1deca1c401e7d6699cc8fcad0971d52e";
	
	public $name="_QQLive";

    public function getSignPackage($url = '') {
        $jsapiTicket = $this->getJsApiTicket();

        if(empty($url)){
            $url = "http://www.tencent-blackboard.com/qqlive/index.html";
        }

        $timestamp = time();
        $nonceStr = $this->createNonceStr();

        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        $string = "jsapi_ticket=".$jsapiTicket."&noncestr=".$nonceStr."&timestamp=".$timestamp."&url=".$url;

        $signature = sha1($string);

        $signPackage = array(
            "appId"     => $this->appId,
            "nonceStr"  => $nonceStr,
            "timestamp" => $timestamp,
            "url"       => $url,
            "signature" => $signature,
            "rawString" => $string
        );

        return $signPackage;
    }

    private function createNonceStr($length = 16) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }
        return $str;
    }

    //获取js的ticket，有效期7200秒，必须缓存
    private function getJsApiTicket() {

        $redis = new Redis_my();
        $redis->hostname = "10.104.246.23";
        $redis->database = 0;
        $redis->port = 6639;

        $timeticket = $redis->get('tickettime');

        //存放redis，初始化token
        if (empty($timeticket)) {
            $accessToken = $this->getAccessToken();
            $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=".$accessToken;
            $res = json_decode($this->httpGet($url));
            $ticket = $res->ticket;
            if ($ticket) {
                $timeticket = time() + 600;

                $redis->set('ticket',$ticket);
                $redis->set('tickettime',$timeticket);
            }
        } else {
            //已经存在数据的时候判断时间是否过期
            if($timeticket < time()){
                $accessToken = $this->getAccessToken();
                $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=".$accessToken;
                $res = json_decode($this->httpGet($url));
                $ticket = $res->ticket;
                if ($ticket) {
                    $timeticket = time() + 600;
                    $redis->set('ticket',$ticket);
                    $redis->set('tickettime',$timeticket);
                }
            }
            $ticket = $redis->get('ticket');
        }

        return $ticket;
    }

    //获取access_token，同缓存，时间同为7200秒
    private function getAccessToken() {
        $redis = new Redis_my();
        $redis->hostname = "10.104.246.23";
        $redis->database = 0;
        $redis->port = 6639;

        $tokenticket = $redis->get('tokenticket');

        if (empty($tokenticket)) {
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$this->appId."&secret=".$this->appSecret;
            $res = json_decode($this->httpGet($url));
            $access_token = $res->access_token;
            if ($access_token) {
                $tokenticket = time() + 600;
                $redis->set('accesstoken',$access_token);
                $redis->set('tokenticket',$tokenticket);
            }
        } else {
            if($tokenticket < time()){
                $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$this->appId."&secret=".$this->appSecret;
                $res = json_decode($this->httpGet($url));
                $access_token = $res->access_token;
                if ($access_token) {
                    $tokenticket = time() + 600;
                    $redis->set('accesstoken',$access_token);
                    $redis->set('tokenticket',$tokenticket);
                }
            }
            $access_token = $redis->get('accesstoken');
        }

        return $access_token;
    }

    //get请求
    private function httpGet($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
        // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
        curl_setopt($curl, CURLOPT_URL, $url);

        $res = curl_exec($curl);
        curl_close($curl);

        return $res;
    }

    private function get_php_file($filename) {
        return trim(substr(file_get_contents($filename), 15));
    }

    private function set_php_file($filename, $content) {
        $fp = fopen($filename, "w");
        fwrite($fp, "<?php exit();?>" . $content);
        fclose($fp);
    }

    //获取分享数据的方法,并保存浏览次数
    public function share_data($url = ''){
        $redis = new Redis_my();
        $redis->hostname = "10.104.246.23";
        $redis->database = 0;
        $redis->port = 6639;

        $load_time=$redis->get('load_time'.$this->name);
        $load_time=$load_time+1;
        $redis->set('load_time'.$this->name,$load_time);

        $data = $this->GetSignPackage($url);
        echo json_encode($data);exit();
    }

}


?>
