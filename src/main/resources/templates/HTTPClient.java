import java.io.*;
import java.net.Socket; 
import java.util.Scanner;


/**
 * A simple Java HTTP web client that downloads a web page using TCP sockets.
 * It connects to a specified host and path, sends a HTTP GET request,
 * and prints the entire response from the server (prints on the screen and also to a file).
 */


public class HTTPClient {
     public static void main(String[] args) { 
     String host = "example.com"; 
     String path = "/";

     int port = 80; //port number for http

     String outputfile = "outputcode.html";

     // 1. Establish a TCP connection to the specified host and port.
     System.out.println("Attempting to connect to " + host + ":" + port + "...");

     try (Socket socket = new Socket(host,port)) {

        System.out.println("Connection established.");

        // 2. Get input and output streams for communication.
        // out for sending text data to the server (HTTP request)
      	PrintWriter out = new PrintWriter(socket.getOutputStream(),true); 

        // in for reading text data from the server (HTTP response).
	Scanner in = new Scanner(socket.getInputStream()); 
        FileOutputStream fileOutputStream = new FileOutputStream(outputfile);

        //fileWriter for writing data to the file outputcode.html
        BufferedWriter fileWriter = new BufferedWriter(new OutputStreamWriter(fileOutputStream, "UTF-8"));

        // 3. Construct the HTTP GET request.
        // The request must end with a double CRLF (\r\n\r\n) to signify the end of headers.
        // "Connection: close" tells the server to close the connection after sending the response,
        // which helps our simple client detect the end of the response stream.
        String httpRequest = "GET " + path + " HTTP/1.1\r\n" +
                             "Host: " + host + "\r\n" +
                             "Connection: close\r\n" +
                             "\r\n";

        System.out.println("\nSending HTTP GET request:\n" + httpRequest);

        // 4. Send the HTTP request to the server.
        out.print(httpRequest);

        out.flush(); // Ensure all data is sent immediately

        String line;
	while (in.hasNextLine()) { 
		line = in.nextLine(); //read the webpage from the server
		fileWriter.write(line); //write the webpage to the file outputcode.html
		fileWriter.newLine(); 
		System.out.println(line); //send the contents of the webpage to command line
	}

	System.out.println("System webpage downloaded successfully to " +outputfile);
        // 5. Close all streams and the socket
        fileWriter.close();
        fileOutputStream.close();

   }//try
   catch (IOException e) { 
     	System.err.println("Error:" +e.getMessage());
   }//catch
  }//main
}
