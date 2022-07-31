export class ModIterate {
    model = {

    }



            

    constructor (
        public rawObj: Object
    ) {}

    /**
     * Iterating Through Sequence
     * @return Array of objects
     */
    Its ( obj: Object, seed: any ) {
        
        // Iterate each entries in terms of their respective index
        for ( let x of Object.entries(obj) ) {
            
            switch ( x.values() ) {

                case this.Reseq(obj):
                    let x = 0;
                    if ( x == this.Reseq(this.model)){
                        return null;             
                    }
            }
        }
    }

    Reseq( obj: Object ) {
        return obj
    }
}