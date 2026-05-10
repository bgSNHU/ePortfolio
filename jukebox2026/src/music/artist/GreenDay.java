package music.artist;

import snhu.jukebox.playlist.Song;
import java.util.ArrayList;

public class GreenDay {
	
	ArrayList<Song> albumTracks;											//Create ArrayList to store all album tracks
	String albumTitle;
	
	public GreenDay() {
		}
	
	public ArrayList<Song> getGreenDaySongs() {
		
		albumTracks = new ArrayList<Song>();								//Instantiate the album
		Song track1 = new Song("Boulevard of Broken Dreams", "Green Day");	//Create song 1
		Song track2 = new Song("Basket Case", "Green Day");					//Create song 2
		Song track3 = new Song("American Idiot", "Green Day");				//Create song 3
		this.albumTracks.add(track1);										//Add song 1 to song list for Green Day
		this.albumTracks.add(track2);										//Add song 2 to song list for Green Day
		this.albumTracks.add(track3);										//Add song 3 to song list for Green Day
		return albumTracks;													//Return all songs for Green Day in ArrayList
	}
	
}
