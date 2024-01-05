import * as cluster from 'cluster';
import * as os from 'os';

export class Cluster {
  static register(callback): void {
    if (process.env.ENABLE_CLUSTERS) {
      if (cluster.isMaster) {
        console.log(`Master server started on ${process.pid}`);

        //ensure workers exit cleanly
        process.on('SIGINT', function () {
          console.log('Cluster shutting down...');

          for (const id in cluster.workers) {
            cluster.workers[id].kill();
          }

          // exit the master process
          process.exit(0);
        });

        const cpus = os.cpus().length;

        for (let i = 0; i < cpus; i++) {
          cluster.fork();
        }

        cluster.on('online', function (worker) {
          console.log('Worker %s is online', worker.process.pid);
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cluster.on('exit', (worker, code, signal) => {
          console.log(`Worker ${worker.process.pid} died. Restarting`);
          cluster.fork();
        });
      } else {
        callback();
      }
    } else {
      callback();
    }
  }
}
