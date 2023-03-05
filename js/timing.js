function toggleStart() {
    if (!startSequencer) { 
        startSequencer = true;
    } else {
        startSequencer = false;
    }
}



function clockCount() {
  
    startButton.mousePressed(toggleStart);


    if (startSequencer) {
        let ellapsedTime = millis() - baseTime;

        if (ellapsedTime > speed) {
            baseTime = millis();
            bCount++;
            playSound(bCount%maxW);
        }
    }
    
    // print(bCount%maxW);
}

function overRect(x,y, width, height) {
    if (mouseX >= x && mouseX <= x+width &&
        mouseY >= y && mouseY <= y+height) {
        return 1;
    } else {
        return 0;
    }

}
