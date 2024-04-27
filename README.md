# 知迹

这是本人的毕业设计，一个知识管理系统。


# 运行

## docker 运行 mysql

首次运行，可以运行一下 docker 命令：

```shell
docker run --name knowTrail -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=know-test -p 3306:3306 -d mysql:latest
```

查看是否运行成功：
    
 ```shell
docker ps
```

如果看到 knowTrail 这个容器，说明运行成功。

除了docker,你可以自己选择安装mysql，然后修改配置文件中的数据库配置。配置目录在 `server/config/dev.yml`。

## 启动服务
    
    ```shell
    cd client
    npm install
    npm run dev
    ```

## 启动服务端

```shell
cd server
npm install
npm run start:dev
```




