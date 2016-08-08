package controllers;

import java.net.UnknownHostException;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class Util {
	private static MongoClient client;

	public static DB connectToDB(){
		try{
			String uri = System.getenv("MLAB_URI");
			MongoClientURI dbURI = new MongoClientURI(uri);
			client = new MongoClient(dbURI);
			DB database = client.getDB(dbURI.getDatabase());
			return database;
		}catch(Exception ex){
			return null;
		}
	}

	public static void closeDB() {
		client.close();
	}

	public static String getUniqueString(String st) {
		return st.replaceAll("/| |,", "_");
	}

	public static String replaceWithMark(String st) {
		st = st.replaceAll(" ", "_");
		st = st.replaceAll("/", "-");
		return st;
	}
}
