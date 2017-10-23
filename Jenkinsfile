pipeline {
  agent any
  stages {
    stage('A') {
      parallel {
        stage('test') {
          agent any
          steps {
            sh 'echo "a"'
          }
        }
        stage('test2') {
          steps {
            echo 'HELLO'
          }
        }
      }
    }
  }
}