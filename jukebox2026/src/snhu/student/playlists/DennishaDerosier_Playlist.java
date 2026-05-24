package snhu.student.playlists;

import snhu.jukebox.playlist.PlayableSong;
import snhu.jukebox.playlist.Song;
import music.artist.*;
import java.util.ArrayList;
import java.util.LinkedList;

public class DennishaDerosier_Playlist {
    
	public LinkedList<PlayableSong> StudentPlaylist(){
	
	LinkedList<PlayableSong> playlist = new LinkedList<PlayableSong>();
	ArrayList<Song> beyonceTracks = new ArrayList<Song>();
    Beyonce beyonce = new Beyonce();
	
    beyonceTracks = beyonce.getBeyonceSongs();
	
	playlist.add(beyonceTracks.get(0));
	playlist.add(beyonceTracks.get(1));
	

    Drake DrakeBand = new Drake();
	ArrayList<Song> DrakeTracks = new ArrayList<Song>();
	DrakeTracks = DrakeBand.getDrakeSongs();
	
	playlist.add(DrakeTracks.get(0));
	playlist.add(DrakeTracks.get(1));
	
	
	
    return playlist;
	}
}