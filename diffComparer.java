import java.io.*;
import java.util.*;

public class diffComparer {
	public static void main(String args[]) {
		
		String fileName1 = args[0];
		String fileName2 = args[1];
		
		String line = null;
		String line1 = null;
		int lineCount =0;
		ArrayList<String> diffUser = new ArrayList<String>();
		ArrayList<String> diffOriginal = new ArrayList<String>();
		ArrayList<Integer> lineNum = new ArrayList<Integer>();	
		try {
			//Users File
			FileReader filereader = new FileReader(fileName1);
			BufferedReader bufferedReader = new BufferedReader(filereader);
			
			//Original File
			FileReader filereader1 = new FileReader(fileName2);
			BufferedReader bufferedReader1 = new BufferedReader(filereader1);
			
			while((line = bufferedReader1.readLine()) != null) {
				lineCount++;
				if ((line1 = bufferedReader.readLine()) != null) {
					if(!line.equals(line1)) {
						diffUser.add(line);
						diffOriginal.add(line1);
						lineNum.add(lineCount);
					}
				}
			}
			
			bufferedReader.close(); 
			bufferedReader1.close(); 		
			
		}
		catch(FileNotFoundException ex) {
			ex.printStackTrace();
		}
		catch(IOException ex) {
			ex.printStackTrace();
		}

		int size = 0;
		System.out.println("----------------------DIFFS-------------------");
		if(diffUser.size() == 0) {
			System.out.println("No Diffs Found. You did great!");
		}
		else {
			while(size != diffOriginal.size() ) {
				System.out.println("Line Number: " + lineNum.get(size));
				System.out.println("Your Output:");
				System.out.println(diffUser);
				System.out.println("=============================================");
				System.out.println("Original Output:");
				System.out.println(diffOriginal);
				System.out.println("=============================================");
				System.out.println("");
				System.out.println("=============================================");
				size++;	
			}
		}
	}
}
