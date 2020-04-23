import java.io.*;
import java.util.*;

public class diffComparer {
	public static void main(String args[]) {
        
	    boolean deepFlag;
	    String usersFile;
	    String originalFile;
	    if(args[0].equals("-deep")) {
	        deepFlag = true;
	        usersFile = args[1];
	        originalFile = args[2];
        }
        else{
            deepFlag = false;
            usersFile = args[0];
            originalFile = args[1];
        }

		String userLine = null;
        String originalLine = null;

		final String ANSI_RED = "\u001B[31m";
		final String ANSI_GREEN = "\u001B[32m";
        final String ANSI_RESET = "\u001B[0m";

		int lineCount =0;
		ArrayList<String> diffUser = new ArrayList<String>();
		ArrayList<String> diffOriginal = new ArrayList<String>();
		ArrayList<Integer> lineNum = new ArrayList<Integer>();	
		try {
			//Users File
			FileReader userFileReader = new FileReader(usersFile);
			BufferedReader bufferedReader = new BufferedReader(userFileReader);
			
			//Original File
			FileReader originalFileReader = new FileReader(originalFile);
			BufferedReader bufferedReader1 = new BufferedReader(originalFileReader);

			//Find if there exists any diffs
			while((userLine = bufferedReader1.readLine()) != null) {
				lineCount++;
				if ((originalLine = bufferedReader.readLine()) != null) {
					if(!userLine.equals(originalLine)) {
                        diffUser.add(userLine);
                        diffOriginal.add(originalLine);
                        lineNum.add(lineCount);
					}
				}
			}
			
			bufferedReader.close(); 
			bufferedReader1.close(); 		
			
		}
		catch(FileNotFoundException ex) {
			System.out.println("Unable to find the file. Please make sure that the file is in the current directory!");
		}
		catch(IOException ex) {
			ex.printStackTrace();
		}

		int size = 0;
		System.out.println("----------------------DIFFS-------------------");
		if(diffUser.size() == 0) {
			System.out.println(ANSI_GREEN + "No Diffs Found. You did great!" + ANSI_RESET);
		}
		else {
			while(size != diffOriginal.size() ) {
                System.out.println(" -----------------");
                System.out.println("| Line Number: " + lineNum.get(size) + " |");
                System.out.println(" -----------------");
                System.out.println("Your Output:");
                System.out.print("\n");
                if (deepFlag) { //If user requested deep diagnostics
                    List<String> deepUserLine = Arrays.asList(diffUser.get(size).split(" "));
                    List<String> deepOriginalLine = Arrays.asList(diffOriginal.get(size).split(" "));
                    for(int k=0; k < deepOriginalLine.size(); k++) {
                        if (!deepUserLine.get(k).equals(deepOriginalLine.get(k))) {
                            System.out.print(ANSI_RED + deepUserLine.get(k) + ANSI_RESET + " ");
                        }
                        else {
                            System.out.print(deepUserLine.get(k) + " ");
                        }
                    }
                    System.out.print("\n");
                    System.out.println("=============================================");
                    System.out.println("Original Output:");
                    System.out.print("\n");
                    for(int k=0; k < deepOriginalLine.size(); k++) {
                        if (!deepUserLine.get(k).equals(deepOriginalLine.get(k))) {
                            System.out.print(ANSI_GREEN + deepOriginalLine.get(k) + ANSI_RESET + " ");
                        }
                        else {
                            System.out.print(deepOriginalLine.get(k) + " ");
                        }
                    }
                    System.out.print("\n");
                }
                else {
                    System.out.println(diffUser.get(size));
                    System.out.println("=============================================");
                    System.out.println("Original Output:");
                    System.out.println(diffOriginal.get(size));
                }
                System.out.println("=============================================");
                System.out.println("");
                System.out.println("=============================================");
                size++;
            }
		}
	}
}
