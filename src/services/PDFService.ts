import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Event } from '../entities/Event';

export class PDFService {
  public async generateEventPDF(event: Event): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 dimensions as the page need to be filled 

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    let yOffset = page.getHeight() - 60; 

    // Title
    page.drawText('Event Report', {
      x: 50,
      y: yOffset,
      size: 26,
      font: timesRomanBoldFont,
      color: rgb(0, 0, 0),
    });
    yOffset -= 50;

    page.drawText(`Event Name: ${event.name || 'Unnamed Event'}`, {
      x: 50,
      y: yOffset,
      size: 20,
      font: timesRomanBoldFont,
      color: rgb(0, 0, 0),
    });
    yOffset -= 30;

    page.drawText(`Event Date: ${event.date || 'No date provided'}`, {
      x: 50,
      y: yOffset,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    yOffset -= 40;

    if (event.sessions && event.sessions.length > 0) {
      event.sessions.forEach((session) => {
        page.drawText(`Session Name: ${session.name}`, {
          x: 50,
          y: yOffset,
          size: 18,
          font: timesRomanBoldFont,
          color: rgb(0, 0, 0),
        });
        yOffset -= 25;

        page.drawText(`Start Time: ${session.startTime}`, {
          x: 50,
          y: yOffset,
          size: 16,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        yOffset -= 20;

        page.drawText(`End Time: ${session.endTime}`, {
          x: 50,
          y: yOffset,
          size: 16,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        yOffset -= 30;

        if (session.participants && session.participants.length > 0) {
          page.drawText('Participants:', {
            x: 50,
            y: yOffset,
            size: 16,
            font: timesRomanBoldFont,
            color: rgb(0, 0, 0),
          });
          yOffset -= 20;

          session.participants.forEach((participant, index) => {
            page.drawText(`${index + 1}. ${participant.name} (${participant.email})`, {
              x: 60, 
              y: yOffset,
              size: 14,
              font: timesRomanFont,
              color: rgb(0, 0, 0),
            });
            yOffset -= 20;
          });
        } else {
          page.drawText('No participants found for this session.', {
            x: 50,
            y: yOffset,
            size: 14,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
          });
          yOffset -= 30;
        }
        yOffset -= 20;
      });
    } else {
      page.drawText('No sessions found for this event.', {
        x: 50,
        y: yOffset,
        size: 18,
        font: timesRomanBoldFont,
        color: rgb(0, 0, 0),
      });
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }
}
