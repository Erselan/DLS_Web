import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import { UploadFile } from '../../../../utils/utils';

const Viewer = ({ docToLoad,caller,onSave }) => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);
  const [callerLoaded, setCallerLoaded] = useState(true);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer',
        initialDoc: docToLoad,
        loadAsPDF: true,
      },
      viewer.current,
    ).then(instance => {
          setInstance(instance)
    });
  }, []);

  useEffect(() => {
    if(instance){
      instance.disableFeatures([instance.Feature.Ribbons,instance.Feature.TextSelection,instance.Feature.Annotations,instance.Feature.NotesPanel]);
      instance.disableTools(['Pan']);
      instance.enableElements(['documentControl']);
      instance.openElements(['leftPanel']);
      
      if(caller && callerLoaded){
        setCallerLoaded(false);
        instance.setHeaderItems(header => {
          header.push({
            type: 'actionButton',
            img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
            onClick: () => {
              const { docViewer } = instance;
              const doc = docViewer.getDocument();
              
              doc.getFileData().then(function(data) {
                var arr = new Uint8Array(data);
                var blob = new Blob([arr], {
                    type: 'application/pdf'
                });
            
                // upload blob here
                // console.log(blob)
                UploadFile(blob).then((data) => {
                  // console.log(data);
                  onSave(data);
                });
                // instance.loadDocument(blob, { filename: 'myfile.pdf' });
              // var fileURL = URL.createObjectURL(blob);
              });
              
            }
          });
        })

        // docViewer.on('dblClick', async (e) => {
        //   console.log(docViewer.getCurrentPage())
        // })

      }else{
          instance.enableFeatures([
            'ThumbnailMultiselect',
            'MultipleViewerMerging',
          ]);
      }
    }
  },[caller,docToLoad,onSave,instance])

  return (<div className="webviewer" ref={viewer} style={{height: "60vh"}}></div>);
};

export default Viewer;
