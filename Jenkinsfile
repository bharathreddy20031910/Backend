pipeline{
    agent any
    stages{
        stage("checkout"){
         steps{
            echo "Clonning Project"
            git url: 'https://github.com/bharathreddy20031910/Backend.git' , branch: 'main'
         }
        }

        stage("install"){
             steps{
                echo "install all packages"
                sh 'npm i'
         }
        }

        stage("Runnning"){
            echo "Running application"
            sh "npm start"
        }
    }
}