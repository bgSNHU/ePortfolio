package snhu.jukebox.playlist.tests;

import static org.junit.Assert.*;
import java.util.ArrayList;
import org.junit.Test;
import music.artist.*;
import snhu.jukebox.playlist.Song;

public class JukeboxTest {

	@Test
	public void testGetBeatlesAlbumSize() throws NoSuchFieldException, SecurityException {
		 TheBeatles theBeatlesBand = new TheBeatles();
		 ArrayList<Song> beatlesTracks = new ArrayList<Song>();
		 beatlesTracks = theBeatlesBand.getBeatlesSongs();
		 assertEquals(2, beatlesTracks.size());
	}
	
	@Test
	public void testGetImagineDragonsAlbumSize() throws NoSuchFieldException, SecurityException {
		 ImagineDragons imagineDragons = new ImagineDragons();
		 ArrayList<Song> imagineDragonsTracks = new ArrayList<Song>();
		 imagineDragonsTracks = imagineDragons.getImagineDragonsSongs();
		 assertEquals(3, imagineDragonsTracks.size());
	}
	
	@Test
	public void testGetAdelesAlbumSize() throws NoSuchFieldException, SecurityException {
		 Adele adele = new Adele();
		 ArrayList<Song> adelesTracks = new ArrayList<Song>();
		 adelesTracks = adele.getAdelesSongs();
		 assertEquals(3, adelesTracks.size());
	}
	
	@Test
	public void testGetGreenDaysAlbumSize() throws NoSuchFieldException, SecurityException {
		GreenDay greenDay = new GreenDay();							//Instantiate GreenDay object for access to song list
		ArrayList<Song> greenDaysTracks = new ArrayList<Song>();	//Create an ArrayList to store returned songs
		greenDaysTracks = greenDay.getGreenDaySongs();				//Retrieves the songs from GreenDay
		assertEquals(3, greenDaysTracks.size());					//Tests that GreenDay contains 3 songs as expected
	}
	
	@Test
	public void testGetMyChemicalRomancesAlbumSize() throws NoSuchFieldException, SecurityException {
		MyChemicalRomance myChemicalRomance = new MyChemicalRomance();							//Instantiate MyChemicalRomance object for access to song list
		ArrayList<Song> myChemicalRomancesTracks = new ArrayList<Song>();						//Create an ArrayList to store returned songs
		myChemicalRomancesTracks = myChemicalRomance.getMyChemicalRomanceSongs();				//Retrieves the songs from MyChemicalRomance
		assertEquals(2, myChemicalRomancesTracks.size());										//Tests that MyChemicalRomance contains 3 songs as expected
	}
	
}
