import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(['definitions'], 'hello.proto');

export default () => {
  client.connect('grpcbin.test.k6.io:9001', {
  });
  const data = { greeting: 'Blablabla' };
  const response = client.invoke('hello.HelloService/SayHello', data);
  const objeto = "hello Blablabla"
  const contenttype = "content-type"

  check(response, {
    'Status Ok Sucesso': (r) => r && r.status === grpc.StatusOK,
    'Valor hello Blablablab de campo reply validado com sucesso': (r) => JSON.stringify(r.message.reply) == JSON.stringify(objeto),
    'Valor do campo error validado com sucesso !': (r) => JSON.stringify(r.headers.content-type[0]).includes("application/grpc")
  });

  console.log(JSON.stringify(response));
  client.close();
  sleep(1);
};
