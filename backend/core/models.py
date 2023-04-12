from core import db

#auid,name,const,ra,dec,varType,maxMag,maxPass,minMag,minPass,epoch,novaYr,period,riseDur,specType,disc
class Vsxdata(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    auid = db.Column(db.String(140), server_default="none")
    name = db.Column(db.String(140))
    const = db.Column(db.String(140))
    ra = db.Column(db.String(140))
    dec = db.Column(db.String(140))
    varType = db.Column(db.String(140), default="n/a")
    #category= db.Column(db.String, db.ForeignKey('category.id'))

    def __repr__(self):
        return '<Vsxdata {}>'.format(self.name)
