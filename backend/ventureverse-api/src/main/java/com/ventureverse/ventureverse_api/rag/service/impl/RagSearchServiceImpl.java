package com.ventureverse.ventureverse_api.rag.service.impl;

import com.ventureverse.ventureverse_api.rag.service.EmbeddingService;
import com.ventureverse.ventureverse_api.rag.service.QdrantRestService;
import com.ventureverse.ventureverse_api.rag.service.RagSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RagSearchServiceImpl
        implements RagSearchService {

    private final EmbeddingService
            embeddingService;

    private final QdrantRestService
            qdrantRestService;

    @Override
    public List<String> search(
            String query) {

        var vector =
                embeddingService
                        .createEmbedding(
                                query
                        );

        return qdrantRestService
                .search(vector);
    }
}