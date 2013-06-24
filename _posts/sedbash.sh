#!/bin/bash
     for fl in *.md; do
	          mv $fl $fl.old
		       sed 's/^```log/```/g' $fl.old > $fl
		            rm -f $fl.old
			         done
