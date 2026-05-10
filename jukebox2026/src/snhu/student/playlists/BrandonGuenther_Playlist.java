package snhu.student.playlists;

import snhu.jukebox.playlist.PlayableSong;
import snhu.jukebox.playlist.Song;
import music.artist.*;
import java.util.ArrayList;
import java.util.LinkedList;

public class BrandonGuenther_Playlist {
	
	public LinkedList<PlayableSong> StudentPlaylist(){
		
		LinkedList<PlayableSong> playlist = new LinkedList<PlayableSong>();		//Create LinkedList to store songs in playlist
		ArrayList<Song> greenDaysTracks = new ArrayList<Song>();		//Create an ArrayList to store all Green Day songs
		GreenDay theGreenDayBand = new GreenDay();		//Instantiate GreenDay class
		
		greenDaysTracks = theGreenDayBand.getGreenDaySongs();		//Retrieve list of songs from GreenDay
		
		playlist.add(greenDaysTracks.get(0));		//Add first song in song list to playlist
		playlist.add(greenDaysTracks.get(1));		//Add second song in song list to playlist
		playlist.add(greenDaysTracks.get(2));		//Add third song in song list to playlist
		
		MyChemicalRomance myChemicalRomanceBand = new MyChemicalRomance();		//Instantiate MyChemicalRomance class
		ArrayList<Song> myChemicalRomancesTracks = new ArrayList<Song>();		//Create an ArrayList to store all Green Day songs
		
		myChemicalRomancesTracks = myChemicalRomanceBand.getMyChemicalRomanceSongs();	//Retrieve list of songs from MyChemicalRomance	
		
		playlist.add(myChemicalRomancesTracks.get(0));		//Add first song in song list to playlist
		playlist.add(myChemicalRomancesTracks.get(1));		//Add second song in song list to playlist
		
		Drake drakeBand = new Drake();		//Instantiate Drake class
		ArrayList<Song> drakeTracks = new ArrayList<Song>();		//Create an ArrayList to store all Drake songs
		
		drakeTracks = drakeBand.getDrakeSongs();		//Retrieve list of songs from Drake
		
		playlist.add(drakeTracks.get(0));		//Add first song in song list to playlist
		
		return playlist;		//Returns compiled playlist
	}

}
