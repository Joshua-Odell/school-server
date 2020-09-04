var fillPdf = require("fill-pdf");
var formDate = { FieldName: 'Text to put into form field' };
var pdfTemplatePath = './IRF.pdf';
 
app.get('/filled_form.pdf', function(req, res) {
  fillPdf.generatePdf(formData, pdfTemplatePath, function(err, output) {
    if ( !err ) {
      res.type("application/pdf");
      res.send(output);
    }
  });
});