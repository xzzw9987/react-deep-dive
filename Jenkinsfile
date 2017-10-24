pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        input 'Hello, put some message'
        sh 'ls && pwd'
        waitUntil() {
          sh 'echo "a"'
        }
        
      }
    }
  }
}
