# 知迹

首次运行，可以运行一下 docker 命令：

```shell
docker run --name knowTrail -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=know-test -p 3306:3306 -d mysql:latest
```

查看是否运行成功：
    
 ```shell
docker ps
```

如果看到 knowTrail 这个容器，说明运行成功。

