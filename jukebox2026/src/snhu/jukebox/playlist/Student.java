package snhu.jukebox.playlist;

import java.util.LinkedList;

public class Student {

	private String name;
	private LinkedList<PlayableSong> playlist;
	
	public Student(String name, LinkedList<PlayableSong> playlist) {
		this.name = name;
		this.playlist = playlist;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public LinkedList<PlayableSong> getPlaylist() {
		return playlist;
	}

	public void setPlaylist(LinkedList<PlayableSong> playlist) {
		this.playlist = playlist;
	}
}
