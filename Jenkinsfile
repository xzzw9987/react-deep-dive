pipeline {
  agent {
    docker {
      image 'node'
    }
  }
  stages {
    stage('test') {
      steps {
        input 'Hello, put some message'
        sh 'node -v'
        sh 'ls && pwd'
        waitUntil() {
          sh 'echo "a"'
          return true;
        }
        
      }
    }
  }
}
